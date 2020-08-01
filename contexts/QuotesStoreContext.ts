import { createContext } from 'react'

import QuotesStore from '../stores/quotesStore'

const QuotesStoreContext = createContext(new QuotesStore())

export default QuotesStoreContext
