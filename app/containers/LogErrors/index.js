import { connect } from 'react-redux'

import ErrorBoundary from 'components/ErrorBoundary'

import { logError } from './LogErrors.actions'

export const mapDispatchToProps = {
    onError: logError,
}

const withConnect = connect(null, mapDispatchToProps)

export default withConnect(ErrorBoundary)
