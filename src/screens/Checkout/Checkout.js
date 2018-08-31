import React from 'react'
import { Header, Message } from 'semantic-ui-react'
import Cart from './Cart'
import Pay from './Pay'

const CheckoutScreen = ({
  onConnectClick,
  onPayClick,
  authorizationURL,
  error,
  errorDetails,
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
          content={
            <div>
              {error}
              {errorDetails && <div>{errorDetails}</div>}
            </div>
          }
        />
      )}

      <Cart cart={cart} />

      <Pay
        onPayClick={onPayClick}
        onConnectClick={onConnectClick}
        authorizationURL={authorizationURL}
        cart={cart}
      />
    </div>
  )
}

export default CheckoutScreen
