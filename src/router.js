import React from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { Container, Menu } from 'semantic-ui-react'

import Checkout from './screens/Checkout'
import Order from './screens/Order'
import OrdersList from './screens/OrdersList'
import Callback from './screens/Callback'

export default function Router() {
  return (
    <BrowserRouter>
      <div>
        <div style={{ marginBottom: 30 }}>
          <Container>
            <Menu inverted>
              <Container>
                <Menu.Item as={Link} header to="/">
                  <span>{'1000pals'}</span>
                </Menu.Item>

                <Menu.Item as={Link} name="orders" to="/orders" />
              </Container>
            </Menu>
          </Container>
        </div>

        <div>
          <Container>
            <Route exact path="/" component={Checkout} />
            <Route exact path="/callback" component={Callback} />
            <Route exact path="/checkout" component={Checkout} />
            <Route exact path="/order/:orderId" component={Order} />
            <Route exact path="/orders" component={OrdersList} />
          </Container>
        </div>
      </div>
    </BrowserRouter>
  )
}
