import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Entypo } from '@expo/vector-icons'

import AboutScreen from '../screens/AboutScreen'
import QuotesScreen from '../screens/QuotesScreen'

const Tab = createBottomTabNavigator()

export default function BottomTabNavigator() {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            title: route.name === 'About' ? 'О приложении' : 'Котировки',
            tabBarIcon: ({ size, color }) => (
                <Entypo name={route.name === 'About' ? 'info' : 'bar-graph'} size={size} color={color} />
            )
        })}>
            <Tab.Screen name="About" component={AboutScreen} />
            <Tab.Screen name="Quotes" component={QuotesScreen} />
        </Tab.Navigator >
    )
}
