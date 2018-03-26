import { loadUser, loadUserFail, loadUserSuccess } from '../ExamplePage.actions'
import { mockCurrentUser } from './mocks'

describe('User Actions', () => {
    describe('loadUser', () => {
        it('should match snapshot', () => {
            expect(loadUser()).toMatchSnapshot()
        })
    })

    describe('loadUserSuccess', () => {
        it('should match snapshot', () => {
            expect(loadUserSuccess(mockCurrentUser)).toMatchSnapshot()
        })
    })

    describe('loadUserFail', () => {
        it('should match snapshot', () => {
            expect(loadUserFail()).toMatchSnapshot()
        })
    })
})
