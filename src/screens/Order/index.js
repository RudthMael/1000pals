import React from 'react'
import Api from '../../services/api'
import OrderScreen from './Order'

class Order extends React.Component {
  state = { payment: null }

  async componentWillMount() {
    const jsonToken = localStorage.getItem('@1000pals.token')
    const jsonAccountId = localStorage.getItem('@1000pals.accountId')
    const token = JSON.parse(jsonToken)
    const accountId = JSON.parse(jsonAccountId)
    const paymentId = this.props.match.params.orderId

    try {
      const { payment } = await Api.fetch(
        `/api/v1/accounts/${accountId}/wallet/payments/${paymentId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      )

      this.setState({ payment })
    } catch (error) {
      console.error('Could not fech payment', error)
      this.setState({ error: error.message })
    }
  }

  render() {
    return <OrderScreen payment={this.state.payment} />
  }
}

export default Order
