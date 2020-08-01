import { observable, action, runInAction } from 'mobx'

interface ITiker {
    id: number,
    last: string,
    lowestAsk: string,
    highestBid: string,
    percentChange: string,
    baseVolume: string,
    quoteVolume: string,
    isFrozen: string,
    high24hr: string,
    low24hr: string
}

interface ICryptoCurrency {
    id: string,
    name: string,
    last: string,
    highestBid: string,
    percentChange: string
}

export default class QuotesStore {
    @observable isLoading = true
    @observable isError = false
    @observable cryptoCurrencies: Array<ICryptoCurrency> = []

    @action.bound async fetchCryptoCurrencies() {
        try {
            const response = await fetch('https://poloniex.com/public?command=returnTicker')
            const result = await response.json()
            const tempCryptoCurrencies: Array<ICryptoCurrency> = []

            for (const [key, value] of Object.entries<ITiker>(result)) {
                tempCryptoCurrencies.push({
                    id: value.id.toString(),
                    name: key,
                    last: value.last,
                    highestBid: value.highestBid,
                    percentChange: value.percentChange
                })
            }

            runInAction(() => {
                this.cryptoCurrencies = tempCryptoCurrencies
                this.isLoading = false
                this.isError = false
            })
        } catch (error) {
            runInAction(() => {
                this.isError = true
            })
            console.log(error)
        }
    }
}
