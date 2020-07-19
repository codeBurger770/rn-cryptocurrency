import React, { useState, useEffect } from 'react'
import { Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useIsFocused } from '@react-navigation/native'

import Table from '../components/Table'
import TableRow from '../components/TableRow'
import TableCell from '../components/TableCell'

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

export default function QuotesScreen() {
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const [cryptoCurrencies, setCryptoCurrencies] = useState<Array<ICryptoCurrency>>([])
    const isFocused = useIsFocused()

    const getCryptoCurrencyFromApi = async () => {
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

            setCryptoCurrencies(tempCryptoCurrencies)
            setIsLoading(false)
            setIsError(false)
        } catch (error) {
            setIsError(true)
            console.log(error)
        }
    }

    useEffect(() => {
        getCryptoCurrencyFromApi()
    }, [])

    useEffect(() => {
        let timerId: number

        if (isFocused) {
            timerId = setInterval(getCryptoCurrencyFromApi, 5000)
        }

        return () => clearInterval(timerId)
    }, [isFocused])

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            {isLoading ? (
                <ActivityIndicator size="large" />
            ) : (
                    <Table>
                        {isError && (
                            <TableRow>
                                <TableCell>
                                    <Text style={[styles.text, styles.textBold, styles.textBad]}>Ошибка</Text>
                                </TableCell>
                            </TableRow>
                        )}
                        <TableRow>
                            <TableCell>
                                <Text style={[styles.text, styles.textBold]}>Имя тикера</Text>
                            </TableCell>
                            <TableCell>
                                <Text style={[styles.text, styles.textBold]}>Последняя цена</Text>
                            </TableCell>
                            <TableCell>
                                <Text style={[styles.text, styles.textBold]}>Текущая цена</Text>
                            </TableCell>
                            <TableCell>
                                <Text style={[styles.text, styles.textBold]}>Изменение</Text>
                            </TableCell>
                        </TableRow>
                        <FlatList
                            data={cryptoCurrencies}
                            renderItem={({ item }) => (
                                <TableRow>
                                    <TableCell>
                                        <Text style={[styles.text, styles.textBold]}>{item.name}</Text>
                                    </TableCell>
                                    <TableCell>
                                        <Text style={styles.text}>{item.last}</Text>
                                    </TableCell>
                                    <TableCell>
                                        <Text style={styles.text}>{item.highestBid}</Text>
                                    </TableCell>
                                    <TableCell>
                                        {+item.percentChange > 0 ? (
                                            <Text style={[styles.text, styles.textGood]}>{`+${item.percentChange}`}</Text>
                                        ) : (
                                                <Text style={[styles.text, styles.textBad]}>{item.percentChange}</Text>
                                            )}
                                    </TableCell>
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
    },
    text: {
        textAlign: 'center',
        fontSize: 10
    },
    textBold: {
        fontWeight: 'bold'
    },
    textGood: {
        color: 'green'
    },
    textBad: {
        color: 'red'
    }
})
