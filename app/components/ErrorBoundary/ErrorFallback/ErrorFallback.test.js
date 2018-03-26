import React from 'react'
import { mount } from 'enzyme'

import ErrorFallback from '.'

describe('<ErrorFallback />', () => {
    it('should match snapshot', () => {
        const renderedComponent = mount(<ErrorFallback />)
        expect(renderedComponent).toMatchSnapshot()
    })
})
