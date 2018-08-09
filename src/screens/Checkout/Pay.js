import React from 'react'
import { Button, Header } from 'semantic-ui-react'

class Pay extends React.Component {
  handlePayClick = event => {
    event.preventDefault()
    this.props.onConnectClick()
  }

  render() {
    return (
      <div>
        <Header>{'Pay with your Lunchr Account'}</Header>
        <Button onClick={this.handlePayClick}>Connect</Button>
      </div>
    )
  }
}

export default Pay
