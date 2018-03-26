import Loadable from 'react-loadable'

import PageLoading from 'components/PageLoading'

export default Loadable({
    loader: () => import('./index'),
    loading: PageLoading,
})
