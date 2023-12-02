import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';

import { useTheme } from '../theme/ThemeProvider';
import { useInstalation } from '../providers/InstalationProvider';

import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ChooseScreen({route, navigation}) {

    const {colors} = useTheme();
    const { instalation, setInstalation } = useInstalation();

    const [ choice, setChoice ] = useState(instalation.id);


    const onClick = (item) => {
        setInstalation(item)
        setChoice(item.id)
        navigation.goBack();
    }


    const Item = ({item}) => {
        console.log(item)
        return(
            <TouchableOpacity 
                style={{
                    width: '100%',
                    //height: 80,
                    backgroundColor: colors.grey_l,
                    marginTop: 10,
                    borderRadius: 5,
                    paddingHorizontal: '5%',
                    paddingBottom: 10
                }}
                onPress={() => onClick(item)}
            >
                 <View 
                    style={{
                        height: 40,
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <Text style={{
                        color: colors.text,
                        fontWeight: 'bold'
                    }}>{item.title}</Text>
                        {choice == item.id ?
                        <Ionicons name={'checkmark-outline'} size={20} color={colors.text} />
                        :
                        <View>

                        </View>
                        }                
                </View>
                <Text style={{
                    color: colors.grey_d
                }}>{item.desc}</Text>
            </TouchableOpacity>
        )
    }

  return (
    <View style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: '5%',
    }}>
        <FlatList
            data={route.params.data}
            renderItem={({item}) => <Item item={item} />}
            keyExtractor={item => item.id}
            style={{
                height: 400,
                width: '100%'
            }}
        />
    </View>
  );
}

