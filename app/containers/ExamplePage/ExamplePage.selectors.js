import { createSelector } from 'reselect'

export const selectExampleState = state => state.get('example')

export const selectCurrentUser = createSelector(
    selectExampleState,
    exampleState => {
        if (!exampleState) return null
        return exampleState.get('currentUser')
    },
)

export const selectCurrentUserError = createSelector(
    selectExampleState,
    exampleState => {
        if (!exampleState) return null
        return exampleState.get('currentUserError')
    },
)
