import { fromJS } from 'immutable'

import {
    LOAD_USER_REQUESTED,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAILED,
} from './ExamplePage.actions'

export const initialState = fromJS({
    currentUser: null,
    currentUserError: false,
})

const exampleReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_USER_REQUESTED:
            return state.merge({
                currentUser: null,
                currentUserError: false,
            })
        case LOAD_USER_SUCCESS:
            return state.merge({
                currentUser: action.payload.currentUserData,
                currentUserError: false,
            })
        case LOAD_USER_FAILED:
            return state.merge({
                currentUserError: true,
            })
        default:
            return state
    }
}

export default exampleReducer
