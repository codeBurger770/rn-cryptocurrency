import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import BottomTabNavigator from './BottomTabNavigator'

const Stack = createStackNavigator()

export default function AppNavigator() {
    return (
        <Stack.Navigator headerMode="none">
            <Stack.Screen name="App" component={BottomTabNavigator} />
        </Stack.Navigator>
    )
}
