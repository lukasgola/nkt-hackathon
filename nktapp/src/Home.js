import { useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Animated } from 'react-native';

//Providers
import { useTheme } from '../theme/ThemeProvider';

//Components
import {Picker} from '@react-native-picker/picker';


export default function Home() {

  instalations = [
    {
        id: 1,
        text: 'A'
    },
    {
        id: 2,
        text: 'B'
    },
    {
        id: 3,
        text: 'C'
    },
    {
        id: 4,
        text: 'E'
    },
    {
      id: 5,
      text: 'F'
  },
]

    const {colors} = useTheme();

    const [instalationType, setInstalationType] = useState("Powietrze");
    const [instalationValue, setInstalationValue] = useState("A");


    const extendValue = useRef(new Animated.Value(0)).current;

    function extend(){
      Animated.spring(extendValue,{
          toValue: 200,
          duration: 400,
          useNativeDriver: false
      }).start()
    } 
    function fold(){
        Animated.spring(extendValue,{
            toValue: 0,
            duration: 100,
            useNativeDriver: false
        }).start()
    } 

    const InputCategory = (props) => {
      return(
        <Text style={{
          color: colors.grey_d,
          fontSize: 14
        }}>{props.text}</Text>
      )
    }

    const onAirClick = () => {
      setInstalationType("Powietrze");
      extend();
    }

    const onGroundClick = () => {
      setInstalationType("Grunt");
      fold();
    }

  return (
    <View style={{
      flex: 1,
      padding: '5%',
      backgroundColor:colors.background
    }}>
      <StatusBar style="auto" />
      <InputCategory text="Sposób instalacji" />
      <View style={{
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
      }}>
        <TouchableOpacity 
          style={{
            width: '47.5%',
            height: '100%',
            backgroundColor: instalationType == "Powietrze" ? colors.primary : colors.grey_l,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onPress={() => onAirClick()}
        >
          <Text style={{
            color: instalationType == "Powietrze" ? colors.background : colors.grey_d,
            fontWeight: instalationType == "Powietrze" ? 'bold' : 'regular',
          }}>Powietrze</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={{
            width: '47.5%',
            height: '100%',
            backgroundColor: instalationType == "Grunt" ? colors.primary : colors.grey_l,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onPress={() => onGroundClick()}
        >
          <Text style={{
            color: instalationType == "Grunt" ? colors.background : colors.grey_d,
            fontWeight: instalationType == "Grunt" ? 'bold' : 'regular',
          }}>Grunt</Text>
        </TouchableOpacity>
      </View>

      <Animated.View style={{
        width: '100%',
        height: extendValue,
        backgroundColor: 'red',
        marginTop: 15
      }}>
        {instalationType == "Powietrze" ?
        <Picker
            selectedValue={instalationValue}
            onValueChange={(itemValue, itemIndex) =>{
                setInstalationValue(itemValue)
            }
            }>
                {instalations.map((item) => (
                    <Picker.Item label={item.text} value={item.text} key={item.id} />
                ))}
        </Picker>
        :
        <View>

        </View>
      }
      </Animated.View>
      


    </View>
  );
}
