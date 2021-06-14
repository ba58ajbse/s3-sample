import React from 'react'
import ReactDOM from 'react-dom'
import './assets/css/index.css'
import { ChakraProvider } from '@chakra-ui/react'
import App from './components/App'
import reportWebVitals from './reportWebVitals'
import cognitoConfig from './cognitoConfig'
import { Amplify } from 'aws-amplify'
import { store } from './store/store'
import { Provider } from 'react-redux'

Amplify.configure(cognitoConfig)

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
