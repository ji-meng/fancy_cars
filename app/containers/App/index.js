import React from 'react'
import { Helmet } from 'react-helmet'
import { Switch, Route } from 'react-router-dom'
import styled from 'styled-components'

import ExamplePage from 'containers/ExamplePage/Loadable'
import LogErrors from 'containers/LogErrors'
import NotFoundPage from 'containers/NotFoundPage/Loadable'
import routes from 'routes'
import { DAEMON } from 'utils/constants'
import injectSaga from 'utils/injectSaga'

import messages from './App.messages'
import saga from './App.saga'

const AppWrapper = styled.div`
    height: 100%;
    padding: 0;
    position: fixed;
    width: 100%;
`

export function App() {
    return (
        <AppWrapper id="react-app-wrapper">
            <Helmet
                titleTemplate={messages.helmet.titleTemplate}
                defaultTitle={messages.helmet.defaultTitle}
            >
                <meta
                    name="description"
                    content={messages.helmet.description}
                />
            </Helmet>
            <LogErrors boundaryName="routes">
                <Switch>
                    <Route
                        exact
                        path={routes.HOMEPAGE}
                        component={ExamplePage}
                    />
                    <Route component={NotFoundPage} />
                </Switch>
            </LogErrors>
        </AppWrapper>
    )
}

const withSaga = injectSaga({ key: 'logErrors', saga, mode: DAEMON })

export default withSaga(App)
