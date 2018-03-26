export const LOAD_USER_REQUESTED =
    'fe-app-boilerplate/ExamplePage/LOAD_USER_REQUESTED'
export const LOAD_USER_SUCCESS =
    'fe-app-boilerplate/ExamplePage/LOAD_USER_SUCCESS'
export const LOAD_USER_FAILED =
    'fe-app-boilerplate/ExamplePage/LOAD_USER_FAILED'

export const loadUser = () => ({
    type: LOAD_USER_REQUESTED,
})
export const loadUserSuccess = currentUserData => ({
    type: LOAD_USER_SUCCESS,
    payload: { currentUserData },
})
export const loadUserFail = error => ({
    type: LOAD_USER_FAILED,
    payload: { error },
})
