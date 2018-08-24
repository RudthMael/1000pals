import React from 'react'
import { Header, Message, Table } from 'semantic-ui-react'

const OrdersListScreen = ({ orders, error }) => {
  return (
    <div>
      <Header as="h1" style={{ marginBottom: 16 }}>
        Your orders
      </Header>

      {error && (
        <Message
          negative
          header="Oops! Could not find your order!"
          content={error}
        />
      )}

      {orders && (
        <Table basic>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Amount</Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {orders.map(order => (
              <Table.Row key={order.uuid}>
                <Table.Cell>{order.uuid}</Table.Cell>
                <Table.Cell>{order.amount} €</Table.Cell>
                <Table.Cell>{order.amount} €</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </div>
  )
}

export default OrdersListScreen
