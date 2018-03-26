import React from 'react'
import PropTypes from 'prop-types'

import messages from './PageLoading.messages'

const PageLoading = ({ error, pastDelay }) => {
    if (error) {
        return <p>{messages.errorMessage}</p>
    } else if (pastDelay) {
        return <p>{messages.loadingMessage}</p>
    }
    return null
}

PageLoading.propTypes = {
    error: PropTypes.bool,
    pastDelay: PropTypes.bool,
}

PageLoading.defaultProps = {
    error: false,
    pastDelay: false,
}

export default PageLoading
