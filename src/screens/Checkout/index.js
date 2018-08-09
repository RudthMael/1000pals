import React from 'react'
import queryString from 'query-string'

import CheckoutScreen from './Checkout'
import Context from './context'

class CheckoutScreenContainer extends React.Component {
  state = { wallet: null }

  componentWillMount() {
    this.parseToken()
    this.fetchWallet()
  }

  parseToken = () => {
    const { access_token: accessToken } = queryString.parse(window.location.hash)

    if (accessToken) {
      localStorage.setItem('@1000pals.token', JSON.stringify(accessToken))
    }
  }

  fetchWallet = async () => {
    const jsonToken = localStorage.getItem('@1000pals.token')
    const jsonAccountId = localStorage.getItem('@1000pals.accountId')

    if (jsonToken) {
      const token = JSON.parse(jsonToken)
      const accountId = JSON.parse(jsonAccountId)

      const { wallet } = await fetch(
        `/api/banking/${accountId}/wallet`,
        {
          headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        }
      )

      this.setState({ wallet })
    }
  }

  handleConnectClick = () => {
    const url = 'https://api-sandbox.lunchr.fr/oauth/authorize?' +
      'grant_type=password&' +
      'client_id=f781c7d3bb6ed7e9d9c4668203cdad4ec912d6c45285cb590c9f36c6dee29012&' +
      'redirect_uri=https://localhost:5000/checkout'

    window.location.href = url
  }

  render () {
    return (
      <Context.Provider value={{ wallet: this.state.wall }}>
        <CheckoutScreen onConnectClick={this.handleConnectClick} />
      </Context.Provider>
    )
  }
}

export default CheckoutScreenContainer
