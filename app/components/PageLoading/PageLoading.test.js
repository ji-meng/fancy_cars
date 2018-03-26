import React from 'react'
import { shallow } from 'enzyme'
import PageLoading from './index'

describe('<PageLoading />', () => {
    it('should match snapshot', () => {
        const renderedComponent = shallow(<PageLoading />)
        expect(renderedComponent).toMatchSnapshot()
    })

    it('should match snapshot when there is an error', () => {
        const renderedComponent = shallow(<PageLoading error />)
        expect(renderedComponent).toMatchSnapshot()
    })

    it('should match snapshot when past delay', () => {
        const renderedComponent = shallow(<PageLoading pastDelay />)
        expect(renderedComponent).toMatchSnapshot()
    })
})
