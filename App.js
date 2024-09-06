import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import StackNavigation from './src/navigation/StackNavigation'
import { Provider } from 'react-redux'
import Store from './src/redux/store'

export default function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <StackNavigation></StackNavigation>
      </NavigationContainer>
      </Provider>
   
  )
}

const styles = StyleSheet.create({})