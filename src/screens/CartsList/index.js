import React from 'react'
import CartsListScreen from './CartsList'
import CARTS from './carts.json'

class CartsListContainer extends React.Component {
  render() {
    return <CartsListScreen carts={CARTS} />
  }
}

export default CartsListContainer
