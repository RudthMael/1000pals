import React from 'react'
import { Button, Header } from 'semantic-ui-react'
import Context from './context'

class Pay extends React.Component {
  handleConnectClick = () => this.props.onConnectClick()

  handlePayClick = event => {
    event.preventDefault()
    this.props.onPayClick()
  }

  render() {
    return (
      <Context.Consumer>
        {({ wallet, fetching, submitting }) => (
          <div>
            <Header>{'Pay with your Lunchr Account'}</Header>

            {!fetching &&
              (wallet ? (
                <div>
                  <p>
                    Your current balance is: {wallet.daily_authorized_balance}&nbsp;€
                  </p>

                  <Button
                    primary
                    loading={submitting}
                    onClick={this.handlePayClick}
                  >
                    Pay{' '}
                    {this.props.cart.items.reduce(
                      (acc, item) => acc + item.price,
                      0
                    )}{' '}
                    €
                  </Button>
                </div>
              ) : (
                <Button
                  primary
                  as="a"
                  href={this.props.authorizationURL}
                  onClick={this.handleConnectClick}
                >
                  Connect
                </Button>
              ))}
          </div>
        )}
      </Context.Consumer>
    )
  }
}

export default Pay
