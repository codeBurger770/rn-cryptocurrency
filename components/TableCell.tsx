import React from 'react'
import { View, StyleSheet } from 'react-native'

export default function TableCell({ children }) {
    return (
        <View style={styles.container}>{children}</View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 12,
        borderWidth: StyleSheet.hairlineWidth
    }
})
