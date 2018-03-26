export function reduceState(reducer, initialState, ...actions) {
    return actions.reduce(reducer, initialState)
}

function maybeToJS(obj) {
    return obj.toJS ? obj.toJS() : obj
}

export function assertFinalState(reducer, initialState, expectedState, ...actions) {
    const finalState = reduceState(reducer, initialState, ...actions)
    expect(maybeToJS(finalState)).toEqual(maybeToJS(expectedState))
}
