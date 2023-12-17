import { Text, View, Modal, Image, TouchableOpacity, Dimensions } from 'react-native'
import { BlurView } from 'expo-blur'
import React from 'react'

import { useTheme } from '../theme/ThemeProvider'

export const IssueDetails = (props) => {

    const {colors} = useTheme();

    const height = Dimensions.get('screen').height;

    return (
        <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalVisible}
        >
            <BlurView 
                style={{
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    paddingTop: 80
                }}
                intensity={30}
                tint='dark'
            >
            </BlurView>
            <View style={{
                width: '90%',
                position: 'absolute',
                marginLeft: '5%',
                bottom: 50
            }}>
                <View style={{
                    borderRadius: 10,
                    width: '100%',
                }}>
                    <Image 
                        source={{uri: props.item?.image}}
                        style={{
                            width: '100%',
                            height: 0.6*height,
                            borderRadius: 10
                        }}
                        //resizeMode='contain'
                    />
                </View>

                <View style={{
                    width: '100%',
                    minHeight: 0.1*height,
                    backgroundColor: colors.grey_l,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: colors.primary,
                    padding: 10,
                    marginTop: 10
                }}>
                    <Text style={{
                        color: colors.grey_d
                    }}>
                        {props.item?.desc}
                    </Text>
                </View>
                
                <TouchableOpacity
                    style={{
                        width: '100%',
                        height: 50,
                        backgroundColor: colors.primary,
                        borderRadius: 10,
                        marginTop: 10,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={() => props.setModalVisible(false)}
                >
                    <Text style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: colors.background
                    }}>Zamknij</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
  }

export default IssueDetails