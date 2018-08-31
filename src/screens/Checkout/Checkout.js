import React from 'react'
import { Header, Message } from 'semantic-ui-react'
import Cart from './Cart'
import Pay from './Pay'

const CheckoutScreen = ({
  onConnectClick,
  onPayClick,
  authorizationURL,
  error,
  cart
}) => {
  return (
    <div>
      <Header as="h1" style={{ marginBottom: 16 }}>
        Checkout
      </Header>

      {error && (
        <Message
          negative
          header="Oops! Could not complete your order!"
          content={error}
        />
      )}

      <Cart cart={cart} />

      <Pay
        onPayClick={onPayClick}
        authorizationURL={authorizationURL}
        cart={cart}
      />
    </div>
  )
}

export default CheckoutScreen
