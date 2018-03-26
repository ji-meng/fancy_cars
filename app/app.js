import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import 'sanitize.css/sanitize.css'

import '!file-loader?name=[name].[ext]!./assets/favicon.ico'  // eslint-disable-line

import App from 'containers/App'

import './styles/global-styles'
import configureStore from './utils/configureStore'
import './utils/fontLoaders'

// Create redux store with history
const initialState = {}
const history = createHistory()
const store = configureStore(initialState, history)
const MOUNT_NODE = document.getElementById('app')

const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <App />
            </ConnectedRouter>
        </Provider>,
        MOUNT_NODE,
    )
}

if (module.hot) {
    // Hot reloadable React components
    // modules.hot.accept does not accept dynamic dependencies,
    // have to be constants at compile-time
    module.hot.accept(['containers/App'], () => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE)
        render()
    })
}

render()
