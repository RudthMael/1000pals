import React from 'react'
import { Table, Header } from 'semantic-ui-react'

const Cart = props => {
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
          <Table.Row>
            <Table.Cell>Juaja Rice</Table.Cell>
            <Table.Cell>14 €</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Coca Zéro</Table.Cell>
            <Table.Cell>3,50 €</Table.Cell>
          </Table.Row>
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell>
              <strong>Total</strong>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <strong>17,50 €</strong>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  )
}

export default Cart
