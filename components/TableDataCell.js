import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function TableDataCell({ children }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{children}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 12,
        borderWidth: StyleSheet.hairlineWidth
    },
    text: {
        textAlign: 'center',
        fontSize: 10
    }
})
