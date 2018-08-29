import React from 'react'
import QueryString from 'query-string'
import jwtDecode from 'jwt-decode'
import CallbackScreen from './Callback'
import Api from '../../services/api'

class Callback extends React.Component {
  state = { fetching: false, error: null }

  async componentWillMount() {
    const API_HOST = process.env.REACT_APP_API_HOST
    const { code } = QueryString.parse(this.props.location.search)

    try {
      this.setState({ fetching: true })

      const result = await Api.fetch(`${API_HOST}/login`, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          code
        })
      })

      const { access_token: accessToken } = result
      const jwtData = jwtDecode(accessToken)

      localStorage.setItem('@1000pals.token', JSON.stringify(accessToken))
      localStorage.setItem('@1000pals.accountId', JSON.stringify(jwtData.bkg))

      window.location.href = '/checkout'
    } catch (error) {
      console.error('Could not log in', error)
      this.setState({ error: error.message, fetching: false })
    }
  }

  render() {
    return (
      <CallbackScreen error={this.state.error} fetching={this.state.fetching} />
    )
  }
}

export default Callback
