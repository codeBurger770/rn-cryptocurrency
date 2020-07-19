import React, { ReactNode } from 'react'
import { View, StyleSheet } from 'react-native'

interface ITableProps {
    children: ReactNode
}

export default function Table({ children }: ITableProps) {
    return (
        <View style={styles.container}>{children}</View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
