import React from 'react'
import { shallow } from 'enzyme'

import NotFoundPage from '.'

describe('<NotFoundPage />', () => {
    it('should match shapshot', () => {
        const renderedComponent = shallow(<NotFoundPage />)
        expect(renderedComponent).toMatchSnapshot()
    })
})
