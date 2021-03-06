import React from 'react'
import { Link } from 'react-router-dom'
import { Header, Message, Table, Button } from 'semantic-ui-react'

const refundFn = (fn, event, orderId) => {
  event.preventDefault()
  fn(orderId)
}

const OrdersListScreen = ({ orders, error, onRefundClick }) => {
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

      <Table basic>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Amount</Table.HeaderCell>
            <Table.HeaderCell colSpan={2} />
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {Object.values(orders).map(order => (
            <Table.Row key={order.uuid}>
              <Table.Cell>
                <Link to={`/order/${order.uuid}`}>{order.uuid}</Link>
              </Table.Cell>
              <Table.Cell>{order.amount} €</Table.Cell>
              <Table.Cell>
                {order.refunded ? (
                  <span>Refunded</span>
                ) : (
                  <Button
                    onClick={e => refundFn(onRefundClick, e, order.uuid)}
                    loading={order.refunding}
                  >
                    Refund
                  </Button>
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}

export default OrdersListScreen
