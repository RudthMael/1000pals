import React from 'react'
import { Button, Card, List, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const CartsList = ({ carts }) => {
  return (
    <Card.Group>
      {Object.values(carts).map(cart => (
        <Card key={cart.id}>
          <Card.Content>
            <Card.Header>
              <span>{cart.restaurant.name}</span>
              {!cart.restaurant.accepts_meal_voucher && (
                <Label color="orange">Refuse Lunchr payments</Label>
              )}
            </Card.Header>
          </Card.Content>

          <Card.Content>
            <Card.Description>
              <List>
                {cart.items.map(item => (
                  <List.Item key={item.name}>
                    {item.name} {item.price} €
                  </List.Item>
                ))}
              </List>

              <List>
                <List.Item>
                  <strong>
                    Total: {cart.items.reduce((acc, i) => acc + i.price, 0)} €
                  </strong>
                </List.Item>
              </List>
            </Card.Description>
          </Card.Content>

          <Card.Content extra>
            <Button primary as={Link} to={`/carts/${cart.id}/checkout`}>
              Buy
            </Button>
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
  )
}

export default CartsList
