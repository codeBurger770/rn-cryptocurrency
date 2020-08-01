import React from 'react'
import { Text, Linking, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function AboutScreen() {
    const handleClick = async () => await Linking.openURL('https://poloniex.com/')

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <Text style={styles.header}>О приложении</Text>
            <Text style={styles.text}>
                Приложение для отслеживания котировок криптовалют с сайта
                {' '}
                <Text style={[styles.text, styles.link]} onPress={handleClick}>poloniex.com</Text>
                .
            </Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12
    },
    header: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 12
    },
    text: {
        fontSize: 16
    },
    link: {
        textDecorationLine: 'underline'
    }
})
