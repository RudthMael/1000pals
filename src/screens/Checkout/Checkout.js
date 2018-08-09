import React from 'react'
import { Header } from 'semantic-ui-react'
import Cart from './Cart'
import Pay from './Pay'

const CheckoutScreen = ({ onConnectClick }) => {
  return (
    <div>
      <Header as="h1" style={{ marginBottom: 16 }}>Checkout</Header>

      <Cart />

      <Pay onConnectClick={onConnectClick} />
    </div>
  )
}

export default CheckoutScreen
