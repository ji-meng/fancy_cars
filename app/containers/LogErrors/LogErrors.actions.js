export const LOG_ERROR = 'fe-app-boilerplate/LogErrors/LOG_ERROR'

export const logError = ({ boundaryName, info, error }) => ({
    type: LOG_ERROR,
    payload: { boundaryName, info, error },
})
