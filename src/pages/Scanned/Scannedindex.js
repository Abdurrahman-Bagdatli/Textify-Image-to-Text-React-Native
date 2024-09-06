import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, Dimensions, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import { ArrowLeftHeader, HeaderTitle, HeaderTitlePhoto, HeaderTitleText } from '../../components/HeaderUtils/Header';

export default function Scannedindex() {
  const route = useRoute()
  const { data } = route.params
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false)
  const [text, setText] = useState("")
  useEffect(() => {
    navigation.setOptions({
      headerTitle: isEnabled ? () => <HeaderTitlePhoto /> : () => <HeaderTitleText />,
    }, [isEnabled])
    setText(data.text)
  }, [])
  return (
    <SafeAreaView style={styles.container}>
      {
        isEnabled ?
          <View style={styles.imageContainer}>
            <Image source={{ uri: data.image }} style={styles.image}></Image>
          </View>
          :

          <TextInput style={styles.textContainer}
            multiline={true}
            onChangeText={text => setText(text)} value={text}
            color={"black"}
            selectionColor={"#FF6347"}
          >
          </TextInput>
      }

      <View style={styles.Button}>
        <TouchableOpacity style={[styles.ButtonContent1, {
          backgroundColor: isEnabled ? "white" : "#007BFF"
        }]} onPress={() => setIsEnabled(false)}>
          <Icon name="format-text" size={35} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.ButtonContent2, {
          backgroundColor: isEnabled ? "#007BFF" : "white"
        }]} onPress={() => setIsEnabled(true)}>
          <Icon2 name="photo" size={35} color="#ccc" />
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  HeaderTitle: {
    fontStyle: "italic",
    fontSize: 20,
    fontWeight: "500",
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  ButtonContent1: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,

  },
  ButtonContent2: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  Button: {
    width: 200,
    zIndex: 1,
    position: "absolute",
    flexDirection: "row",
    top: "90%",
    left: "50%",
    transform: [{ translateX: -100 }],
    borderRadius: 10,
    backgroundColor: "white",
  },
  textContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    flex: 1,
    width: "100%",
    textAlign:"left",
    textAlignVertical:"top",
  },
  text: {
    color: "black",
    fontWeight: "400",
    width: "100%",
    borderWidth: 10,
  }
})