import React from 'react'
import PropTypes from 'prop-types'

import ErrorFallback from './ErrorFallback'

class ErrorBoundary extends React.PureComponent {
    static propTypes = {
        children: PropTypes.node,
        onError: PropTypes.func.isRequired,
        boundaryName: PropTypes.string.isRequired,
    }

    static defaultProps = {
        children: null,
    }

    constructor(props) {
        super(props)
        this.state = { hasError: false }
    }

    componentDidCatch(error, info) {
        this.setState({ hasError: true })
        this.props.onError({
            error,
            info,
            boundaryName: this.props.boundaryName,
        })
    }

    render() {
        if (this.state.hasError) {
            return <ErrorFallback />
        }
        return this.props.children
    }
}

export default ErrorBoundary
