import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HOME, PHOTO, SCANNED } from '../utils/Uri';
import Homeindex from '../pages/Home/Homeindex';
import Scannedindex from '../pages/Scanned/Scannedindex';
const Stack = createNativeStackNavigator();

export default function StackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={HOME} component={Homeindex} options={{ headerShown: false }} />
      <Stack.Screen name={SCANNED} component={Scannedindex} options={{
        headerShown: true,
        headerTintColor: 'white',
        headerTitleAlign: 'center',
        headerStyle:{
          backgroundColor:"#007BFF"
        }
      }} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})