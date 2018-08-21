import React from 'react'
import queryString from 'query-string'
import jwtDecode from 'jwt-decode'

import CheckoutScreen from './Checkout'
import Context from './context'
import Api from '../../services/api'

class CheckoutScreenContainer extends React.Component {
  state = { wallet: null, fetching: true, submitting: false, error: null }

  componentWillMount() {
    this.parseToken()
    this.fetchWallet()
  }

  parseToken = () => {
    const { access_token: jwt } = queryString.parse(window.location.hash)

    if (jwt) {
      const jwtData = jwtDecode(jwt)

      localStorage.setItem('@1000pals.token', JSON.stringify(jwt))
      localStorage.setItem('@1000pals.accountId', JSON.stringify(jwtData.bkg))
    }
  }

  fetchWallet = async () => {
    const jsonToken = localStorage.getItem('@1000pals.token')
    const jsonAccountId = localStorage.getItem('@1000pals.accountId')

    if (jsonToken) {
      const token = JSON.parse(jsonToken)
      const accountId = JSON.parse(jsonAccountId)

      try {
        const { wallet } = await Api.fetch(
          `/api/v0/accounts/${accountId}/wallet`,
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

  handleConnectClick = () => {
    const url =
      'https://api-sandbox.lunchr.fr/oauth/authorize?' +
      'response_type=token&' +
      'client_id=f781c7d3bb6ed7e9d9c4668203cdad4ec912d6c45285cb590c9f36c6dee29012&' +
      `redirect_uri=${window.location.href}`

    window.location.href = url
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
      const { payment } = await Api.fetch(`/api/v0/payments`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        data: JSON.stringify({
          payment: {
            account_uuid: accountId,
            merchant_siret: '80918561400017',
            merchant_name: 'B.F NICE',
            amount: 17.5
          }
        })
      })

      this.props.history.push(`/orders/${payment.uuid}`)
    } catch (error) {
      this.setState({ error: error.message, submitting: false })
    }
  }

  render() {
    const providerData = {
      wallet: this.state.wallet,
      fetching: this.state.fetching,
      submitting: this.state.submitting,
    }

    return (
      <Context.Provider value={providerData}>
        <CheckoutScreen
          {...this.props}
          error={this.state.error}
          onConnectClick={this.handleConnectClick}
          onPayClick={this.handlePayClick}
        />
      </Context.Provider>
    )
  }
}

export default CheckoutScreenContainer
