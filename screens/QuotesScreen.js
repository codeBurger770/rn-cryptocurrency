import React, { useState, useEffect } from 'react'
import { FlatList, ActivityIndicator, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import Table from '../components/Table'
import TableRow from '../components/TableRow'
import TableHeaderCell from '../components/TableHeaderCell'
import TableDataCell from '../components/TableDataCell'

export default function QuotesScreen() {
    const [isLoading, setIsLoading] = useState(true)
    const [cryptoCurrency, setCryptoCurrency] = useState([])

    const getCryptoCurrencyFromApi = async () => {
        try {
            const response = await fetch('https://poloniex.com/public?command=returnTicker')
            const result = await response.json()
            const tempCryptoCurrency = []

            for (const [key, value] of Object.entries(result)) {
                tempCryptoCurrency.push({
                    id: value.id.toString(),
                    name: key,
                    last: value.last,
                    highestBid: value.highestBid,
                    percentChange: value.percentChange
                })
            }

            setCryptoCurrency(tempCryptoCurrency)
            setIsLoading(false)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getCryptoCurrencyFromApi()
        const timerId = setInterval(getCryptoCurrencyFromApi, 5000)
        return () => clearInterval(timerId)
    }, [])

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            {isLoading ? (
                <ActivityIndicator size="large" />
            ) : (
                    <Table>
                        <TableRow>
                            <TableHeaderCell>Криптовалюта</TableHeaderCell>
                            <TableHeaderCell>Последняя цена</TableHeaderCell>
                            <TableHeaderCell>Текущая цена</TableHeaderCell>
                            <TableHeaderCell>Изменение</TableHeaderCell>
                        </TableRow >
                        <FlatList
                            data={cryptoCurrency}
                            renderItem={({ item }) => (
                                <TableRow>
                                    <TableHeaderCell>{item.name}</TableHeaderCell>
                                    <TableDataCell>{item.last}</TableDataCell>
                                    <TableDataCell>{item.highestBid}</TableDataCell>
                                    <TableDataCell>{item.percentChange}</TableDataCell>
                                </TableRow>
                            )}
                            keyExtractor={item => item.id}
                        />
                    </Table >
                )}
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
})
