import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { ConfirmProvider } from 'react-use-confrim'

import App from './App'

ReactDOM.render(<ConfirmProvider><App /></ConfirmProvider>, document.getElementById('root'))
