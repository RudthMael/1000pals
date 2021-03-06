import React from 'react'
import ReactDOM from 'react-dom'
import 'semantic-ui-css/semantic.min.css'

import './index.css'
import App from './router'
import { unregister } from './registerServiceWorker'

ReactDOM.render(<App />, document.getElementById('root'))
unregister()
