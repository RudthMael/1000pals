import React from 'react'
import Api from '../../services/api'
import OrdersListScreen from './OrdersList'

const BANKING_API_HOST =
  process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API_HOST : ''
const API_HOST = process.env.REACT_APP_API_HOST

class OrdersList extends React.Component {
  state = { orders: {}, refunding: false }

  async componentWillMount() {
    const jsonToken = localStorage.getItem('@1000pals.token')
    const token = JSON.parse(jsonToken)

    try {
      const { payments } = await Api.fetch(`${API_HOST}/payments`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      const orders = payments.reduce(
        (acc, payment) => ({
          ...acc,
          [payment.uuid]: payment
        }),
        {}
      )

      this.setState({ orders })
    } catch (error) {
      console.log('Could not fetch payments', error)
      this.setState({ error: error.message })
    }
  }

  async handleRefundClick(orderId) {
    try {
      this.setState({
        orders: {
          ...this.state.orders,
          [orderId]: {
            ...this.state.orders[orderId],
            refunding: true
          }
        }
      })

      const jsonToken = localStorage.getItem('@1000pals.token')
      const jsonAccountId = localStorage.getItem('@1000pals.accountId')

      if (jsonToken) {
        const token = JSON.parse(jsonToken)
        const accountId = JSON.parse(jsonAccountId)

        const url = `${BANKING_API_HOST}/api/v1/accounts/${accountId}/wallet/payments/${orderId}/refund`
        await Api.fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          method: 'PUT'
        })

        const { payment } = await Api.fetch(
          `${API_HOST}/payments/${orderId}/refund`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            method: 'POST'
          }
        )

        this.setState({
          orders: {
            ...this.state.orders,
            [orderId]: payment
          }
        })
      }
    } catch (error) {
      console.error('Could not make a refund', error)
      this.setState({ error: error.message })
    }
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
