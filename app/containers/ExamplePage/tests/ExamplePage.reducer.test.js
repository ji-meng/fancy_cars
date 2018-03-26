import { loadUser, loadUserSuccess, loadUserFail } from '../ExamplePage.actions'
import userReducer, { initialState } from '../ExamplePage.reducer'
import { mockCurrentUser } from './mocks'

describe('userReducer', () => {
    let state
    beforeEach(() => {
        state = initialState
    })

    it('should return the initial state', () => {
        expect(userReducer(undefined, {})).toEqual(state)
    })

    it('should handle the loadUser action correctly', () => {
        const expectedResult = state.merge({
            currentUser: null,
            currentUserError: false,
        })

        expect(userReducer(state, loadUser())).toEqual(expectedResult)
    })

    it('should handle the loadUserSuccess action correctly', () => {
        const expectedResult = state.merge({
            currentUser: mockCurrentUser,
            currentUserError: false,
        })

        expect(userReducer(state, loadUserSuccess(mockCurrentUser))).toEqual(
            expectedResult,
        )
    })

    it('should handle the loadUserFail action correctly', () => {
        const expectedResult = state.merge({
            currentUser: null,
            currentUserError: true,
        })

        expect(userReducer(state, loadUserFail())).toEqual(expectedResult)
    })
})
