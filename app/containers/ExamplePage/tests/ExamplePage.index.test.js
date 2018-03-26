import React from 'react'
import { bindActionCreators } from 'redux'
import { shallow, mount } from 'enzyme'

import { ExamplePage, mapDispatchToProps } from '../index'
import { loadUser } from '../ExamplePage.actions'

const defaultProps = {
    loadUser: () => {},
}

describe('<ExamplePage />', () => {
    it('should match snapshot', () => {
        const renderedComponent = shallow(<ExamplePage {...defaultProps} />)
        expect(renderedComponent).toMatchSnapshot()
    })

    it('should load the user on mount', () => {
        const getUserSpy = jest.fn()
        mount(<ExamplePage loadUser={getUserSpy} />)
        expect(getUserSpy).toHaveBeenCalled()
    })

    describe('mapDispatchToProps', () => {
        describe('loadUser', () => {
            it('should be injected', () => {
                const dispatch = jest.fn()
                const result = bindActionCreators(mapDispatchToProps, dispatch)
                expect(result.loadUser).toBeDefined()
            })

            it('should dispatch loadUser when called', () => {
                const dispatch = jest.fn()
                const result = bindActionCreators(mapDispatchToProps, dispatch)
                result.loadUser()
                expect(dispatch).toHaveBeenCalledWith(loadUser())
            })
        })
    })
})
