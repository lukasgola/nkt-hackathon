import React, { useState, useEffect } from 'react';
import { Dimensions ,Text, View, Button, Image, TouchableOpacity, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Alert, ActivityIndicator} from 'react-native';
import { Camera } from 'expo-camera';

import Ionicons from 'react-native-vector-icons/Ionicons';

import CustomMultilineInput from '../components/CustomMultilineInput';

import {useTheme} from '../theme/ThemeProvider';
import {useForm, Controller} from 'react-hook-form';

import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';

import { useCurrentLocation } from '../providers/CurrentLocationProvider';


//Firebase
import { auth, uploadImage, addQuickAction, addIssue } from '../firebase/firebase-config'; 

export default function QuickAction({navigation}) {



    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [camera, setCamera] = useState(null);
    const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.front);
    const [isSending, setIsSending] = useState(false);

    const {colors} = useTheme();
    const {currentLocation} = useCurrentLocation();

    const { control, handleSubmit, formState: {errors} } = useForm();

    const onCreateQuickEvent = async data => {
        Alert.alert('Nowa Usterka', 'Czy chcesz wysłać nową usterkę', [
        {
            text: 'Anuluj',
            onPress: () => {},
            style: 'cancel',
        },
        {
            text: 'Tak',
            onPress: async () => {
                try {
                    setIsSending(true)
                    const {description} = data;
                    const url = await uploadImage(auth.currentUser.uid, image)
                    const event = {
                        image: url.downloadURL,
                        desc: description == undefined ? '' : description,
                        latitude: currentLocation.latitude,
                        longitude: currentLocation.longitude
                    }
                    await addIssue(event);
                    setIsSending(false)
                    navigation.goBack();
                } catch (error) {
                    console.log(error)
                }
                
                
            }},
        ]);
        
    };


    if (!permission) {
    // Camera permissions are still loading
    return <View />;
    }

    if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{ textAlign: 'center' }}>Aby korzystać z kamery potrzebujemy twojej zgody</Text>
        <Button onPress={requestPermission} title="Przyznaj dostęp" />
        </View>
    );
    }

    function toggleCameraType() {
        setType(
            type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
    }


    const takePicture = async () => {
        if(camera){
            const data = await camera.takePictureAsync();
            const manipResult = await manipulateAsync(
                data.uri,
                [{ rotate: 0 }],
                { compress: 0, format: SaveFormat.JPEG }
              );
              setImage(manipResult.uri);
              console.log(manipResult.uri)
        }
    }


    const retake = async () => {
        setImage(null)
    }

    if (permission === false) {
        return <Text>No access to camera</Text>;
    }

    if (image == null){

    return (
        <View style={{ flex: 1}}>
            <Camera 
                ref={ref => setCamera(ref)}
                type={type}
                ratio="1:1"
                style={{flex: 1}}
            />
            <View 
                style={{
                    position: 'absolute',
                    bottom: 50,
                    width: '100%',
                    height: 200,
                    alignItems: 'center',
                    justifyContent: 'space-around',
                }}
            >
                <TouchableOpacity 
                    onPress={() => takePicture()} 
                    style={{
                        width: 80,
                        height: 80,
                        borderRadius: 40,
                        backgroundColor: colors.grey_l,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <View style={{
                        width: 60,
                        height: 60,
                        borderRadius: 30,
                        backgroundColor: colors.grey
                    }}>

                    </View>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={() => toggleCameraType() }
                    style={{
                        width: 60,
                        height: 60,
                        borderRadius: 30,
                        backgroundColor: colors.grey_l,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Ionicons name={'repeat-outline'} size={25} color={colors.text} />
                </TouchableOpacity>
            </View>
        </View>
    );
    } else {

    return (
        <KeyboardAvoidingView 
            behavior='padding'
            keyboardShouldPersistTaps='handled'
            style={{ flex: 1, padding: '5%', }}
        >
            {!isSending ?
            <View style={{flex: 1, justifyContent: 'space-around'}}>
            
            <TouchableWithoutFeedback
                onPress={() => {
                    Keyboard.dismiss();
                }}
            >
                <Image 
                    source={{uri: image}}
                    style={{
                        width: '100%',
                        height: '70%',
                        borderRadius: 10,

                    }}
                />
            </TouchableWithoutFeedback>
                <View style={{
                    width: '100%',
                    height: '10%',
                }}>
                    <CustomMultilineInput
                        name="description"
                        control={control}
                        placeholder="Napisz co się stało ..."
                        size={12} 
                        color={colors.grey_l} 
                        multiline={true}
                    />
                </View>
                
                <View style={{
                    width: '100%',
                    marginBottom: '10%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',

                }}>
                    <TouchableOpacity 
                        onPress={() => retake()} 
                        style={{
                            width: '30%',
                            height: 50,
                            borderRadius: 10,
                            backgroundColor: colors.background,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{
                            color: colors.text,
                            fontWeight: 'bold'
                        }}>RETAKE</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={handleSubmit(onCreateQuickEvent)}
                        style={{
                            width: '60%',
                            height: 50,
                            borderRadius: 10,
                            backgroundColor: colors.primary,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Text style={{
                            color: colors.background,
                            fontWeight: 'bold'
                        }}>NEXT</Text>
                    </TouchableOpacity>
                </View>
                </View>
                :
                <View style={{
                    flex: 1,
                    backgroundColor: colors.background,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <View style={{padding: 40, backgroundColor: colors.grey_l, borderRadius: 10, marginBottom: 10}}> 
                        <ActivityIndicator />
                    </View>
                    
                    <Text style={{fontWeight: 'bold'}}>Przesyłanie obrazu</Text>
                </View>
                    }
        </KeyboardAvoidingView>
    )
    }
}