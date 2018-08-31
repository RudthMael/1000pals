import React from 'react'
import { Table, Header } from 'semantic-ui-react'

const Cart = ({ cart }) => {
  return (
    <div style={{ marginBottom: 30 }}>
      <Header>Your cart content</Header>

      <Table basic>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Item</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {cart.items.map(item => (
            <Table.Row key={item.name}>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.price} €</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell>
              <strong>Total</strong>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <strong>
                {cart.items.reduce((acc, item) => acc + item.price, 0)} €
              </strong>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  )
}

export default Cart
