import React from 'react'
import Api from '../../services/api'
import OrdersListScreen from './OrdersList'

class OrdersList extends React.Component {
  state = { orders: [] }

  async componentWillMount() {
    const jsonToken = localStorage.getItem('@1000pals.token')
    const token = JSON.parse(jsonToken)

    try {
      const API_HOST = process.env.REACT_APP_API_HOST
      const { payments } = await Api.fetch(`${API_HOST}/payments`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      this.setState({ orders: payments })
    } catch (error) {
      console.log(error)
      this.setState({ error: error.message })
    }
  }

  handleRefundClick(orderId) {
    console.log(orderId)
  }

  render() {
    return (
      <OrdersListScreen
        orders={this.state.orders}
        error={this.state.error}
        onRefundClick={this.handleRefundClick.bind(this)}
      />
    )
  }
}

export default OrdersList
