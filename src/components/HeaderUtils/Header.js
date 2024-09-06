import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/AntDesign';


export const HeaderTitlePhoto = () => {
  return(
    <Text style={styles.HeaderTitle}>Scanned Photo</Text>
  )
}

export const HeaderTitleText = () => {
  return(
    <Text style={styles.HeaderTitle}>Scanned Text</Text>
  )
}


const styles = StyleSheet.create({
  HeaderTitle:{
    fontStyle: "italic",
    fontSize: 20,
    fontWeight: "500",
    color:"white",
  }
})