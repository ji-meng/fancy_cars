import { call, put, takeLatest } from 'redux-saga/effects'

import request from 'helpers/request'

import {
    LOAD_USER_REQUESTED,
    loadUserFail,
    loadUserSuccess,
} from './ExamplePage.actions'

export function* getUserData() {
    const requestURL = `https://randomuser.me/api/`

    try {
        const response = yield call(request.get, requestURL)
        const userData = response.data.results[0]
        yield put(
            loadUserSuccess({
                name: `${userData.name.first} ${userData.name.last}`,
                email: userData.email,
            }),
        )
    } catch (error) {
        yield put(loadUserFail(error.response.status))
    }
}

export default function* exampleSagaWatcher() {
    yield takeLatest(LOAD_USER_REQUESTED, getUserData)
}
