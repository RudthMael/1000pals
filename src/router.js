import React from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { Container, Menu } from 'semantic-ui-react'

import Home from './screens/Home'
import Checkout from './screens/Checkout'

export default function Router() {
  return (
    <BrowserRouter>
      <div>
        <Menu inverted>
          <Container>
            <Menu.Item as={Link} header to="/">
              <span>{'1000pals'}</span>
            </Menu.Item>
          </Container>
        </Menu>

        <div style={{ paddingTop: 30 }}>
          <Container>
            <Route exact path="/" component={Home} />
            <Route exact path="/checkout" component={Checkout} />
          </Container>
        </div>
      </div>
    </BrowserRouter>
  )
}
