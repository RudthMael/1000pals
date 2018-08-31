import React from 'react'

import CheckoutScreen from './Checkout'
import Context from './context'
import Api from '../../services/api'
import CARTS from '../CartsList/carts.json'

const BANKING_API_HOST =
  process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API_HOST : ''

class Checkout extends React.Component {
  constructor(props) {
    super(props)

    this.currentCart = CARTS[props.match.params.cartId]
    this.state = {
      wallet: null,
      fetching: true,
      submitting: false,
      error: null,
      errorDetails: null
    }
  }

  componentWillMount() {
    this.fetchWallet()
  }

  fetchWallet = async () => {
    const jsonToken = localStorage.getItem('@1000pals.token')
    const jsonAccountId = localStorage.getItem('@1000pals.accountId')

    if (jsonToken) {
      const token = JSON.parse(jsonToken)
      const accountId = JSON.parse(jsonAccountId)

      try {
        const { wallet } = await Api.fetch(
          `${BANKING_API_HOST}/api/v1/accounts/${accountId}/wallet`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )

        this.setState({ wallet })
      } catch (e) {
        console.log('Could not fetch wallet')

        localStorage.removeItem('@1000pals.token')
        localStorage.removeItem('@1000pals.accountId')
      }
    }

    this.setState({ fetching: false })
  }

  get authorizationURL() {
    const OAUTH_HOST = process.env.REACT_APP_OAUTH_HOST
    const OAUTH_UID = process.env.REACT_APP_OAUTH_UID

    const query = [
      'response_type=code',
      `client_id=${OAUTH_UID}`,
      `redirect_uri=${window.location.origin}/callback`,
      'scope=wallet_read payment_write'
    ].join('&')
    const url = [`${OAUTH_HOST}/oauth/authorize`, query].join('?')

    return url
  }

  handleConnectClick = () =>
    localStorage.setItem(
      'loginRedirectPath',
      JSON.stringify(this.props.location.pathname)
    )

  handlePayClick = async () => {
    if (this.state.submitting) {
      return
    }

    const jsonToken = localStorage.getItem('@1000pals.token')
    const jsonAccountId = localStorage.getItem('@1000pals.accountId')
    const token = JSON.parse(jsonToken)
    const accountId = JSON.parse(jsonAccountId)

    this.setState({ submitting: true })

    try {
      const { payment } = await Api.fetch(
        `${BANKING_API_HOST}/api/v1/accounts/${accountId}/wallet/payments`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          method: 'POST',
          body: JSON.stringify({
            payment: {
              merchant_siret: this.currentCart.restaurant.siret,
              merchant_name: this.currentCart.restaurant.name,
              amount: this.currentCart.items.reduce(
                (acc, item) => acc + item.price,
                0
              ),
              currency: 'EUR',
              date: new Date().toISOString()
            }
          })
        }
      )

      const API_HOST = process.env.REACT_APP_API_HOST
      await Api.fetch(`${API_HOST}/payments`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        method: 'POST',
        body: JSON.stringify({
          payment
        })
      })

      this.props.history.push(`/order/${payment.uuid}`)
    } catch (error) {
      console.error('Could not make payment', error.response)
      const details =
        error.response.error.details &&
        Object.keys(error.response.error.details)
          .reduce(
            (acc, key) => [
              ...acc,
              `${key}: ${error.response.error.details[key]
                .map(v => v.message)
                .join(', ')}`
            ],
            []
          )
          .join(',')
      this.setState({
        error: error.message,
        errorDetails: details,
        submitting: false
      })
    }
  }

  render() {
    const providerData = {
      wallet: this.state.wallet,
      fetching: this.state.fetching,
      submitting: this.state.submitting
    }

    return (
      <Context.Provider value={providerData}>
        <CheckoutScreen
          {...this.props}
          cart={this.currentCart}
          error={this.state.error}
          errorDetails={this.state.errorDetails}
          onPayClick={this.handlePayClick}
          onConnectClick={this.handleConnectClick}
          authorizationURL={this.authorizationURL}
        />
      </Context.Provider>
    )
  }
}

export default Checkout
