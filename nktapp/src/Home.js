import { useState, useRef, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Animated } from 'react-native';

//Providers
import { useTheme } from '../theme/ThemeProvider';
import { useIsFocused } from '@react-navigation/native';
import { useInstalation } from '../providers/InstalationProvider';

//Components
import {Picker} from '@react-native-picker/picker';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function Home({navigation}) {

  const instalationsAir = [
    {
      id: 1,
      title: 'A1',
      desc: 'Bezpośrednio w ścianie izolowanej cieplnie'
    },
    {
      id: 2,
      title: 'A2',
      desc: 'W rurze instalacyjnej w ścianie izolowanej cieplnie'
    },
    {
      id: 3,
      title: 'B1',
      desc: 'W rurze instalacyjnej na ścianie/murze - dla kabli jednozyłowych'
    },
    {
      id: 4,
      title: 'B2',
      desc: 'W rurze instalacyjnej na ścianie/murze - dla kabli i przewodow wielozyłowych'
    },
    {
      id: 5,
      title: 'E',
      desc: 'W powietrzu (np. perforowane koryto) - dla kabli i przewodów wielozyłowych'
    },
    {
      id: 6,
      title: 'F',
      desc: 'W powietrzu (np. perforowane koryto) - dla kabli i przewodów jednozyłowych'
    },
  ]

  const instalationsGround = [
    {
      id: 1,
      title: 'D1',
      desc: 'W rurze osłonowej w ziemi'
    },
    {
      id: 2,
      title: 'D2',
      desc: 'Bezpośrednio w ziemi'
    }
  ]

    const {colors} = useTheme();
    const {instalation} = useInstalation();

    const [instalationType, setInstalationType] = useState("Powietrze");
    const [instalationCollection, setInstalationCollection] = useState(instalationsAir);
    const [instalationString, setInstalationString] = useState();

    const isFocused = useIsFocused();

    const extendValue = useRef(new Animated.Value(0)).current;

    function extend(){
      Animated.timing(extendValue,{
          toValue: 40,
          duration: 200,
          useNativeDriver: false
      }).start()
    } 
    function fold(){
        Animated.timing(extendValue,{
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
      setInstalationCollection(instalationsAir);
      extend();
    }

    const onGroundClick = () => {
      setInstalationType("Grunt");
      setInstalationCollection(instalationsGround);
      fold();
    }


    useEffect(() => {
      if(instalation.id){
          setInstalationString(instalation.title)
      }
  }, [isFocused])
    

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

      <View style={{
        width: '100%',
        height: 40,
        marginTop: 15
      }}>
          <TouchableOpacity 
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: colors.grey_l,
              borderRadius: 5,
              paddingHorizontal: '5%',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row'
            }}
            onPress={() => navigation.navigate('ChooseScreen', {data: instalationCollection})}
          >
            <Text style={{
              color: colors.grey_d
            }}>{ instalationString ? instalationString : "Wybierz" }</Text>
            <Ionicons name={'chevron-forward-outline'} size={20} color={colors.text} />
          </TouchableOpacity>
      </View>
      


    </View>
  );
}
