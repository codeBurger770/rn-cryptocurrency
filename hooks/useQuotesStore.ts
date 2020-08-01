import { useContext } from 'react'

import QuotesStoreContext from '../contexts/QuotesStoreContext'

const useQuotesStore = () => useContext(QuotesStoreContext)

export default useQuotesStore
