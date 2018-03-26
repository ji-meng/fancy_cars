import { takeLatest } from 'redux-saga/effects'

import { LOG_ERROR } from 'containers/LogErrors/LogErrors.actions'

export function* logAppError(error) {
    if (process.env.NODE_ENV !== 'production') {
        console.log(error) // eslint-disable-line no-console
    }
}

export default function* appErrorWatcher() {
    yield takeLatest(LOG_ERROR, logAppError)
}
