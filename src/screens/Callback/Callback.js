import React from 'react'
import { Message, Icon } from 'semantic-ui-react'

const CallbackScreen = ({ error }) => {
  return error ? (
    <Message negative>
      <Message.Header>We're sorry we can't log you in</Message.Header>
      <p>{error}</p>
    </Message>
  ) : (
    <Message icon>
      <Icon name="circle notched" loading />
      <Message.Content>
        <Message.Header>Just one second</Message.Header>
        We're logging you in.
      </Message.Content>
    </Message>
  )
}

export default CallbackScreen
