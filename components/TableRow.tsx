import React, { ReactNode } from 'react'
import { View, StyleSheet } from 'react-native'

interface ITableRowProps {
    children: ReactNode
}

export default function TableRow({ children }: ITableRowProps) {
    return (
        <View style={styles.container}>{children}</View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    }
})
