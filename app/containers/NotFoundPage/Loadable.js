import Loadable from 'react-loadable'

import PageLoading from 'components/PageLoading/index'

export default Loadable({
    loader: () => import('./index'),
    loading: PageLoading,
})
