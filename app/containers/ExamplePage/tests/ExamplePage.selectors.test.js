import { fromJS } from 'immutable'

import {
    selectExampleState,
    selectCurrentUser,
    selectCurrentUserError,
} from '../ExamplePage.selectors'

describe('selectExampleState', () => {
    it('should select the home state', () => {
        const exampleState = fromJS({
            currentUser: {},
        })
        const mockedState = fromJS({
            example: exampleState,
        })
        expect(selectExampleState(mockedState)).toEqual(exampleState)
    })
})

describe('selectCurrentUser', () => {
    it('should select the current user', () => {
        const currentUser = fromJS({
            name: 'Vikram Ravindran',
            email: 'vik@yolo.com',
        })
        const mockedState = fromJS({
            example: {
                currentUser,
            },
        })
        expect(selectCurrentUser(mockedState)).toEqual(currentUser)
    })
})

describe('selectCurrentUserError', () => {
    it('should select the current user error', () => {
        const currentUserError = true
        const mockedState = fromJS({
            example: {
                currentUserError,
            },
        })
        expect(selectCurrentUserError(mockedState)).toEqual(currentUserError)
    })
})
