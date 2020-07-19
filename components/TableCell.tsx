import React, { ReactNode } from 'react'
import { View, StyleSheet } from 'react-native'

interface ITableCellProps {
    children: ReactNode
}

export default function TableCell({ children }: ITableCellProps) {
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
