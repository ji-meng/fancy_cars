import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { compose } from 'redux'
import styled from 'styled-components'

import injectReducer from 'utils/injectReducer'
import injectSaga from 'utils/injectSaga'

import { loadUser } from './ExamplePage.actions'
import messages from './ExamplePage.messages'
import exampleReducer from './ExamplePage.reducer'
import exampleSaga from './ExamplePage.saga'
import {
    selectCurrentUser,
    selectCurrentUserError,
} from './ExamplePage.selectors'

const CenteredDiv = styled.div`
    text-align: center;
`

// eslint-disable-next-line react/prefer-stateless-function
export class ExamplePage extends React.PureComponent {
    static propTypes = {
        currentUser: PropTypes.shape({
            name: PropTypes.string,
            email: PropTypes.string,
        }),
        currentUserError: PropTypes.bool,
        loadUser: PropTypes.func.isRequired,
    }

    static defaultProps = {
        currentUserError: false,
    }

    componentDidMount() {
        this.props.loadUser()
    }

    getUserData() {
        const user = this.props.currentUser
        if (this.props.currentUserError) {
            return <p>{messages.errorLoadingUser}</p>
        } else if (user) {
            return (
                <p>
                    {user.get('name')} - {user.get('email')}
                </p>
            )
        }
        return <p>{messages.loadingUser}</p>
    }

    render() {
        return (
            <CenteredDiv>
                <Helmet>
                    <title>{messages.helmet.title}</title>
                    <meta
                        name="description"
                        content={messages.helmet.description}
                    />
                </Helmet>
                <h1>{messages.welcomeMessage}</h1>
                {this.getUserData()}
            </CenteredDiv>
        )
    }
}

export const mapStateToProps = state => ({
    currentUser: selectCurrentUser(state),
    currentUserError: selectCurrentUserError(state),
})

export const mapDispatchToProps = {
    loadUser,
}

const withState = compose(
    injectReducer({ key: 'example', reducer: exampleReducer }),
    injectSaga({ key: 'example', saga: exampleSaga }),
    connect(mapStateToProps, mapDispatchToProps),
)

export default withState(ExamplePage)
