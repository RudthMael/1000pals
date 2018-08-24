import React from 'react'

import CheckoutScreen from './Checkout'
import Context from './context'
import Api from '../../services/api'

class Checkout extends React.Component {
  state = { wallet: null, fetching: true, submitting: false, error: null }

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
        const API_HOST = process.env.REACT_APP_API_HOST
        const { wallet } = await Api.fetch(
          `${API_HOST}/api/v1/accounts/${accountId}/wallet`,
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
        `/api/v1/accounts/${accountId}/wallet/payments`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          method: 'POST',
          body: JSON.stringify({
            payment: {
              merchant_siret: '80918561400017',
              merchant_name: 'B.F NICE',
              amount: 17.5,
              currency: 'EUR',
              date: new Date().toISOString()
            }
          })
        }
      )

      this.props.history.push(`/order/${payment.uuid}`)
    } catch (error) {
      this.setState({ error: error.message, submitting: false })
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
          error={this.state.error}
          onPayClick={this.handlePayClick}
          authorizationURL={this.authorizationURL}
        />
      </Context.Provider>
    )
  }
}

export default Checkout
