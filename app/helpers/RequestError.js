class RequestError extends Error {
    constructor(response) {
        super('An error has occurred processing your request')
        this.response = response
    }
}

export default RequestError
