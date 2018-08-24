import React from 'react'
import Api from '../../services/api'
import OrdersListScreen from './OrdersList'

class OrdersList extends React.Component {
  state = { orders: [] }

  async componentWillMount() {
    const jsonToken = localStorage.getItem('@1000pals.token')
    const jsonAccountId = localStorage.getItem('@1000pals.accountId')
    const token = JSON.parse(jsonToken)
    const accountId = JSON.parse(jsonAccountId)

    try {
      const { payments: orders } = Api.fetch(
        `/api/v1/accounts/${accountId}/wallet/payments`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      )

      this.setState({ orders })
    } catch (error) {
      console.log(error)
      this.setState({ error: error.message })
    }
  }

  render() {
    return (
      <OrdersListScreen orders={this.state.orders} error={this.state.error} />
    )
  }
}

export default OrdersList
