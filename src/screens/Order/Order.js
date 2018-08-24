import React from 'react'
import { Header, Message, Table } from 'semantic-ui-react'

const OrderScreen = ({ payment, error }) => {
  return (
    <div>
      <Header as="h1" style={{ marginBottom: 16 }}>
        Your order
      </Header>

      {error && (
        <Message
          negative
          header="Oops! Could not find your order!"
          content={error}
        />
      )}

      {payment && (
        <Table basic>
          <Table.Body>
            <Table.Row>
              <Table.Cell>ID</Table.Cell>
              <Table.Cell>{payment.uuid}</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>Date</Table.Cell>
              <Table.Cell>{payment.date}</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>Amount</Table.Cell>
              <Table.Cell>{payment.amount} €</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>Merchant name</Table.Cell>
              <Table.Cell>{payment.merchant_name}</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>Merchant SIRET</Table.Cell>
              <Table.Cell>{payment.merchant_siret}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      )}
    </div>
  )
}

export default OrderScreen
