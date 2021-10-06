import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { ConfirmProvider } from 'react-use-confirm'

import App from './App'
import PoorConfirm from './PoorConfirm'

ReactDOM.render(
  <ConfirmProvider ConfirmComponent={PoorConfirm}>
    <App />
  </ConfirmProvider>,
  document.getElementById('root')
)
