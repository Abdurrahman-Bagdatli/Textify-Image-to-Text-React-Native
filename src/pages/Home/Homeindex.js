import { Alert, Button, Dimensions, FlatList, Image, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/Ionicons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { SCANNED } from '../../utils/Uri';
import ImagePicker from 'react-native-image-crop-picker';
import { add_To_Database, convertImage, fetch_To_Database, remove_From_Database } from '../../Axios/Axios';
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_DATA } from '../../redux/Actions/ActionsType';
import LottieView from "lottie-react-native";
import { EmojiSad } from 'iconsax-react-native';

export default function Homeindex() {
    const { width, height } = Dimensions.get("window");
    const dispatch = useDispatch();
    const data = useSelector(state => state.items.data);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    // Tarih işlemleri
    const day = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const date = day + '/' + month + '/' + year;

    const navigation = useNavigation();



    const sendToPhoto = async (imageBase64, imagePath) => {
        const data = {
            image: imageBase64,
        }
        try {
            const response = await convertImage(data)
            if (response) {
                if(response.data.status === "success"){
                    const info = {
                        text: response.data.text,
                        image: imagePath,
                        date: date,
                    }
                    add_To_Database(info)
                    navigation.navigate(SCANNED, { data: info })
                }
                if(response.data.status === "error"){
                    console.log(response.data.message)
                   Alert.alert("Oops...",`${response.data.message}`)
                }
            }
            else {
                console.error("No response received from convertImage")
            }
        } catch (error) {
            console.error("Error converting image:", error.message);
        }
    }
    const selectPhotoOnGallery = () => {
        ImagePicker.openPicker({
            cropping: true,
            includeBase64: true,
            compressImageQuality: 1,
            avoidEmptySpaceAroundImage: true,
            freeStyleCropEnabled: true,
        }).then(image => {
            const imagePath = image.path
            const imageInfo = `data:${image.mime};base64,${image.data}`
            sendToPhoto(imageInfo, imagePath);

        })

    }
    const takePhotoOnCamera = () => {
        ImagePicker.openCamera({
            cropping: true,
            includeBase64: true,
            avoidEmptySpaceAroundImage: true,
            compressImageQuality: 1,
            freeStyleCropEnabled: true,
            width: 300,
            height: 400,
        }).then(image => {
            const imagePath = image.path
            const imageInfo = `data:${image.mime};base64,${image.data}`
            sendToPhoto(imageInfo, imagePath);
        });
    }

    const fetchData = async () => {
        try {
            const response = await fetch_To_Database();
            if (response !== null) {
                dispatch({ type: FETCH_DATA, payload: response });
            } else {
                console.error("No response received from fetch_To_Database");
            }
        } catch (error) {
            console.error("Error fetching data:", error.message);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(useCallback(() => {
        fetchData();
    }, []))
    
    const removeItem = async (dataId) => {
        try {
            const info = {
                id: dataId,
            };
            const response = await remove_From_Database(info);

            if (response) {
                fetchData()
            }
            return response;
        } catch (error) {
            console.error("Erroro removing item:", error.message);
        }
    }

    const noData = () => {
        return(
            <View style={{flex:1,justifyContent:"center",alignItems:"center", backgroundColor: "#fff"}}>
              <EmojiSad size="115" color="#007BFF"/>
              <Text style={{fontSize:19,fontWeight:"500"}}>Not Found Data</Text>
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image source={require("../../components/Assets/image/Textify2.png")} style={styles.HeaderImage}></Image>
            </View>
            <View style={styles.subContainer}>
                {loading ? 
                 (
                    <View style={{flex:1,justifyContent:"center",alignItems:"center", backgroundColor: "#fff"}}>
                        <LottieView
                            source={require("../../components/Assets/animations/E8ZJLF83Hl.json")}
                            style={{ width: "15%", height: "15%" }}
                            autoPlay
                            loop
                        />
                    </View>
                ) :
                (
                    <FlatList
                        data={data}
                        ListEmptyComponent={noData}
                        contentContainerStyle={{flex:1}}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => { navigation.navigate(SCANNED, { data: item }) }} style={styles.ItemContainer}>
                                <View style={styles.firstContainer}>
                                    <Image source={{ uri: item.image }} style={styles.image}></Image>
                                </View>
                                <View style={styles.secondContainer}>
                                    <View style={{ flex: 1, padding: 5, flexDirection: "column" }}>
                                        <View style={styles.titleContainer}>
                                            <Text numberOfLines={3} style={styles.title}>{item.text}</Text>
                                        </View>
                                        <View style={styles.dateContainer} >
                                            <Text style={styles.date}>{item.date}</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity style={{ justifyContent: "flex-end", alignItems: "center" }} onPress={() => removeItem(item.id)}>
                                        <Icon name="highlight-remove" size={30} color="red" />
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        )}
                    >
                    </FlatList>
                )

            }

                <TouchableOpacity onPress={() => setModalVisible(true)} style={[styles.photoButton, { bottom: height * 0.03, right: width * 0.03 }]}>
                    <Icon name="add-photo-alternate" size={35} color="#fff" />
                </TouchableOpacity>
                <Modal
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalBackground}>

                        <View style={styles.modalContent}>
                            <View style={styles.galleryContianer}>
                                <TouchableOpacity style={styles.EditPhotoButton}
                                    onPress={() => {
                                        takePhotoOnCamera()
                                        setModalVisible(false)
                                    }
                                    }
                                >
                                    <Icon2 name="camera" size={35} color="#fff" />

                                </TouchableOpacity>
                                <Text style={styles.modalText}>Camera</Text>
                            </View>
                            <View style={styles.cameraContianer}>
                                <TouchableOpacity style={styles.EditPhotoButton}
                                    onPress={() => {
                                        selectPhotoOnGallery()
                                        setModalVisible(false)
                                    }}
                                >
                                    <Icon name="add-to-photos" size={35} color="#fff" />
                                </TouchableOpacity>
                                <Text style={styles.modalText}>Gallery</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => setModalVisible(false)} >
                            <Icon3 name="close-circle-sharp" size={53} color="#fff" />
                        </TouchableOpacity>

                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
    },
    HeaderImage: {
        width: 130,
        height: 40
    },
    subContainer: {
        flex: 1,
    },
    ItemContainer: {
        width: "90%",
        height: 130,
        flexDirection: "row",
        marginVertical: 5,
        borderColor: "#B0A9AA",
        padding: 5,
        left: 20,
        borderWidth: 2,
        borderBottomLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 3,
        borderTopLeftRadius: 3,
    },
    image: {
        width: "95%",
        height: "95%",
        borderRadius: 15,
        resizeMode: "cover",
    },
    title: {
        color: "black",
        fontSize: 14,
        fontWeight: "500",
        width: "100%",
        height: "100%",
    },
    date: {
        color: "#333",
        fontSize: 14,
        fontWeight: "500",
    },
    firstContainer: {
        flex: 0.4,
        justifyContent: "center",
        alignItems: "center",
    },
    secondContainer: {
        flex: 1,
        padding: 5,
        flexDirection: "row",
    },
    titleContainer: {
        flex: 1,
    },
    dateContainer: {
        flex: 0.2,

    },
    photoButton: {
        position: "absolute",
        zIndex: 1,
        backgroundColor: "#007BFF",
        padding: 10,
        borderRadius: 27,
        justifyContent: "flex-end",
        alignItems: "flex-end",
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 200,
        padding: 3,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: "center",
        flexDirection: "row",
    },
    EditPhotoButton: {
        borderWidth: 3,
        borderColor: "#fff",
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 50,
    },
    galleryContianer: {
        marginRight: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    cameraContianer: {
        justifyContent: "center",
        alignItems: "center",
    },
    modalText: {
        fontSize: 15,
        fontWeight: "500",
        color: "#fff",
    }
})