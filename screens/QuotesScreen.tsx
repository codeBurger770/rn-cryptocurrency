import React, { useEffect } from 'react'
import { Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useIsFocused } from '@react-navigation/native'
import { observer } from 'mobx-react'

import Table from '../components/Table'
import TableRow from '../components/TableRow'
import TableCell from '../components/TableCell'
import useQuotesStore from '../hooks/useQuotesStore'

const QuotesScreen = observer(() => {
    const quotesStore = useQuotesStore()
    const isFocused = useIsFocused()

    useEffect(() => {
        quotesStore.fetchCryptoCurrencies()
    }, [])

    useEffect(() => {
        let timerId: number

        if (isFocused) {
            timerId = setInterval(quotesStore.fetchCryptoCurrencies, 5000)
        }

        return () => clearInterval(timerId)
    }, [isFocused])

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            {quotesStore.isLoading ? (
                <ActivityIndicator size="large" />
            ) : (
                    <Table>
                        {quotesStore.isError && (
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
                            data={quotesStore.cryptoCurrencies}
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
                                        {+item.percentChange >= 0 ? (
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
})

export default QuotesScreen

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
