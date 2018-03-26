import { put, takeLatest } from 'redux-saga/effects'

import RequestError from 'helpers/RequestError'

import {
    mockCurrentUser,
    mockCurrentUserFirstName,
    mockCurrentUserLastName,
} from './mocks'

import {
    LOAD_USER_REQUESTED,
    loadUserSuccess,
    loadUserFail,
} from '../ExamplePage.actions'
import userSagaWatcher, { getUserData } from '../ExamplePage.saga'

/* eslint-disable redux-saga/yield-effects */
describe('getUserData Saga', () => {
    let getUserDataGenerator

    const mockUserAPIResponse = {
        results: [
            {
                email: mockCurrentUser.email,
                name: {
                    first: mockCurrentUserFirstName,
                    last: mockCurrentUserLastName,
                },
            },
        ],
    }

    beforeEach(() => {
        getUserDataGenerator = getUserData()

        const callDescriptor = getUserDataGenerator.next().value
        expect(callDescriptor).toMatchSnapshot()
    })

    it('should dispatch the reposLoaded action if it requests the data successfully', () => {
        const response = {
            status: 200,
            data: mockUserAPIResponse,
        }
        const putDescriptor = getUserDataGenerator.next(response).value
        const expectedPut = put(loadUserSuccess(mockCurrentUser))
        expect(putDescriptor).toEqual(expectedPut)
    })

    it('should call the repoLoadingError action if the response errors', () => {
        const response = new RequestError({ status: 500 })
        const putDescriptor = getUserDataGenerator.throw(response).value
        const expectedPut = put(loadUserFail(500))
        expect(putDescriptor).toEqual(expectedPut)
    })
})

describe('userSagaWatcher Saga', () => {
    let userSagaWatcherSaga

    beforeEach(() => {
        userSagaWatcherSaga = userSagaWatcher()
    })

    it('should start task to watch for LOAD_USER_REQUESTED action', () => {
        const takeLatestDescriptor = userSagaWatcherSaga.next().value
        const expectedTakeLatest = takeLatest(LOAD_USER_REQUESTED, getUserData)
        expect(takeLatestDescriptor).toEqual(expectedTakeLatest)
    })
})
