import { useState, useRef, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Animated, TextInput, ScrollView, DrawerLayoutAndroidComponent } from 'react-native';

//Providers
import { useTheme } from '../theme/ThemeProvider';
import { useIsFocused } from '@react-navigation/native';
import { useInstalation } from '../providers/InstalationProvider';
import { useWireCount } from '../providers/WireCountProvider';

//Components
import {Picker} from '@react-native-picker/picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import Toast from 'react-native-toast-message';



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

  const wiresCount = [
    {
      id: 1,
      title: 'A',
      desc: 'Układ jednofazowy (dwie zyły obciązone)'
    },
    {
      id: 2,
      title: 'B',
      desc: 'Układ trójfazowy wielozyłowy (trzy zyły obiązone)'
    },
    {
      id: 3,
      title: 'C',
      desc: 'Układ trójfazowy jednozyłowy (trzy zyły obciązone)'
    }
  ]

    const {colors} = useTheme();
    const {instalation, setInstalation} = useInstalation();
    const {wireCount, setWireCount} = useWireCount();

    //Typ instalacji
    const [instalationType, setInstalationType] = useState("Powietrze");
    const [instalationCollection, setInstalationCollection] = useState(instalationsAir);
    const [instalationString, setInstalationString] = useState('');

    //Temperatura
    const [airTemp, setAirTemp] = useState('30');

    const [groundTemp, setGroundTemp] = useState('30')
    const [groundRes, setGroundRes] = useState('1.0')

    const [wireCountString, setWireCountString] = useState('');


    const [metalType, setMetalType] = useState(null)
    const [isolationType, setIsolationType] = useState(null)


    const [valueType, setValueType] = useState(null);

    const [power, setPower] = useState('5');
    const [current, setCurrent] = useState('5');


    const isFocused = useIsFocused();


    const InputCategory = (props) => {
      return(
        <Text style={{
          color: colors.grey_d,
          fontSize: 14,
        }}>{props.text}</Text>
      )
    }

    const onAirClick = () => {
      setInstalationType("Powietrze");
      setInstalationCollection(instalationsAir);
      setInstalation({})
      setInstalationString(null)
      setWireCount({})
      setWireCountString(null)
      setMetalType(null)
      setIsolationType(null)
    }

    const onGroundClick = () => {
      setInstalationType("Grunt");
      setInstalationCollection(instalationsGround)
      setInstalation({})
      setInstalationString(null)
      setWireCount({})
      setWireCountString(null)
      setMetalType(null)
      setIsolationType(null)
    }

    const showErrorToast = () => {
      Toast.show({
        type: 'error',
        text1: 'Brakujące pola',
        text2: 'Wypełnij dokładnie formularz'
      });
    }


    const onSubmit = () => {
      if(instalation.id && wireCount.id && metalType && isolationType && valueType){

        console.log('hurra')
      } else {
        showErrorToast()
        console.log('error')
      }
    }


    useEffect(() => {
      if(instalation.id){
          setInstalationString(instalation.title)
      }
      if(wireCount.id){
        setWireCountString(wireCount.title)
      }
  }, [isFocused])
    

  return (
    <ScrollView style={{
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
            backgroundColor: colors.grey_l,
            borderColor: instalationType == "Powietrze" ? colors.primary : colors.grey_l,
            borderWidth: 2,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onPress={() => onAirClick()}
        >
          <Text style={{
            color: instalationType == "Powietrze" ? colors.primary : colors.grey_d,
            fontWeight: instalationType == "Powietrze" ? 'bold' : 'regular',
          }}>Powietrze</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={{
            width: '47.5%',
            height: '100%',
            backgroundColor: colors.grey_l,
            borderColor: instalationType == "Grunt" ? colors.primary : colors.grey_l,
            borderWidth: 2,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onPress={() => onGroundClick()}
        >
          <Text style={{
            color: instalationType == "Grunt" ? colors.primary : colors.grey_d,
            fontWeight: instalationType == "Grunt" ? 'bold' : 'regular',
          }}>Grunt</Text>
        </TouchableOpacity>
      </View>

      <View style={{
        width: '100%',
        height: 50,
        marginTop: 15
      }}>
          <TouchableOpacity 
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: colors.grey_l,
              borderRadius: 10,
              paddingHorizontal: '5%',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              borderWidth: 2,
              borderColor: instalation.id ? colors.primary : colors.grey_l
            }}
            onPress={() => navigation.navigate('ChooseScreen', {data: instalationCollection, mode: instalation, setMode: setInstalation })}
          >
            <Text style={{
              color: instalation.id ? colors.primary : colors.grey_d,
              fontWeight: instalation.id ? 'bold' : 'regular'
            }}>{ instalationString ? instalationString : "Wybierz" }</Text>
            <Ionicons name={'chevron-forward-outline'} size={20} color={colors.text} />
          </TouchableOpacity>
      </View>

      {instalationType == "Powietrze" ? 
        <View style={{
          width: '100%',
          paddingTop: 20
        }}>
          <InputCategory text="Temperatura powietrza" />
        <View style={{
          width: '100%',
          alignItems: 'center',
          marginTop: 20
        }}>
          <TextInput
            style={{
              width: 80,
              height: 60,
              backgroundColor: colors.grey_l,
              borderRadius: 10,
              textAlign: 'center',
              fontSize: 24
            }}
            onChangeText={setAirTemp}
            value={airTemp}
            keyboardType="numeric"
          />
          <Slider
            style={{width: '80%', height: 40, marginTop: 20}}
            minimumValue={10}
            maximumValue={80}
            minimumTrackTintColor={colors.primary}
            maximumTrackTintColor={colors.grey}
            value={airTemp}
            onValueChange={(value) => setAirTemp(value.toFixed(0).toString())}
          />
        </View>
          
        </View>
      :
        <View>
          <View style={{
            width: '100%',
            paddingTop: 20
          }}>
            <InputCategory text="Temperatura gruntu" />
            <View style={{
              width: '100%',
              alignItems: 'center',
              marginTop: 20
            }}>
              <TextInput
                style={{
                  width: 80,
                  height: 60,
                  backgroundColor: colors.grey_l,
                  borderRadius: 10,
                  textAlign: 'center',
                  fontSize: 24
                }}
                onChangeText={setGroundTemp}
                value={groundTemp}
                keyboardType="numeric"
              />
              <Slider
                style={{width: '80%', height: 40, marginTop: 20}}
                minimumValue={10}
                maximumValue={80}
                minimumTrackTintColor={colors.primary}
                maximumTrackTintColor={colors.grey}
                value={groundTemp}
                onValueChange={(value) => setGroundTemp(value.toFixed(0).toString())}
              />
            </View>
          </View>

          <View style={{
            width: '100%',
            paddingTop: 20
          }}>
            <InputCategory text="Rezystowność gruntu" />
            <View style={{
              width: '100%',
              alignItems: 'center',
              marginTop: 20
            }}>
              <TextInput
                style={{
                  width: 80,
                  height: 60,
                  backgroundColor: colors.grey_l,
                  borderRadius: 10,
                  textAlign: 'center',
                  fontSize: 24
                }}
                onChangeText={setGroundRes}
                value={groundRes}
                keyboardType="numeric"
              />
              <Slider
                style={{width: '80%', height: 40, marginTop: 20}}
                minimumValue={10}
                maximumValue={80}
                minimumTrackTintColor={colors.primary}
                maximumTrackTintColor={colors.grey}
                value={groundRes}
                onValueChange={(value) => setGroundRes(value.toFixed(0).toString())}
              />
            </View>
          </View>

        </View>
      }

      <View style={{
        width: '100%',
        paddingTop: 20
      }}>

        <InputCategory text="Liczba zył" />

        <View style={{
          width: '100%',
          height: 50,
          marginTop: 15
        }}>
            <TouchableOpacity 
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: colors.grey_l,
              borderRadius: 10,
              paddingHorizontal: '5%',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              borderWidth: 2,
              borderColor: wireCount?.id ? colors.primary : colors.grey_l
            }}
            onPress={() => navigation.navigate('ChooseScreen', {data: wiresCount, mode: wireCount, setMode: setWireCount})}
          >
            <Text style={{
              color: wireCount?.id ? colors.primary : colors.grey_d,
              fontWeight: wireCount?.id ? 'bold' : 'regular'
            }}>{ wireCountString ? wireCountString : "Wybierz" }</Text>
            <Ionicons name={'chevron-forward-outline'} size={20} color={colors.text} />
          </TouchableOpacity>
      </View>
      
      </View>


      <View style={{
        width: '100%',
        marginTop: 20,
      }}>
        <InputCategory text="Rodzaj metalu zyły przewodzącej" />
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
              backgroundColor: colors.grey_l,
              borderColor: metalType == "Al" ? colors.primary : colors.grey_l,
              borderWidth: 2,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onPress={() => setMetalType('Al')}
          >
            <Text style={{
              color: metalType == "Al" ? colors.primary : colors.grey_d,
              fontWeight: metalType == "Al" ? 'bold' : 'regular',
            }}>Al</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={{
              width: '47.5%',
              height: '100%',
              backgroundColor: colors.grey_l,
              borderColor: metalType == "Cu" ? colors.primary : colors.grey_l,
              borderWidth: 2,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onPress={() => setMetalType('Cu')}
          >
            <Text style={{
              color: metalType == "Cu" ? colors.primary : colors.grey_d,
              fontWeight: metalType == "Cu" ? 'bold' : 'regular',
            }}>Cu</Text>
          </TouchableOpacity>
        </View>
      </View>


      <View style={{
        width: '100%',
        marginTop: 20,
      }}>
        <InputCategory text="Rodzaj izolacji" />
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
              backgroundColor: colors.grey_l,
              borderColor: isolationType == "PVC" ? colors.primary : colors.grey_l,
              borderWidth: 2,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onPress={() => setIsolationType('PVC')}
          >
            <Text style={{
              color: isolationType == "PVC" ? colors.primary : colors.grey_d,
              fontWeight: isolationType == "PVC" ? 'bold' : 'regular',
            }}>PVC</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={{
              width: '47.5%',
              height: '100%',
              backgroundColor: colors.grey_l,
              borderColor: isolationType == "XLPE" ? colors.primary : colors.grey_l,
              borderWidth: 2,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onPress={() => setIsolationType('XLPE')}
          >
            <Text style={{
              color: isolationType == "XLPE" ? colors.primary : colors.grey_d,
              fontWeight: isolationType == "XLPE" ? 'bold' : 'regular',
            }}>XLPE</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{
        width: '100%',
        marginTop: 20,
      }}>
        <InputCategory text="Moc lub prąd" />
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
              backgroundColor: colors.grey_l,
              borderColor: valueType == "Moc" ? colors.primary : colors.grey_l,
              borderWidth: 2,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onPress={() => setValueType('Moc')}
          >
            <Text style={{
              color: valueType == "Moc" ? colors.primary : colors.grey_d,
              fontWeight: valueType == "Moc" ? 'bold' : 'regular',
            }}>Moc</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={{
              width: '47.5%',
              height: '100%',
              backgroundColor: colors.grey_l,
              borderColor: valueType == "Prąd" ? colors.primary : colors.grey_l,
              borderWidth: 2,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onPress={() => setValueType('Prąd')}
          >
            <Text style={{
              color: valueType == "Prąd" ? colors.primary : colors.grey_d,
              fontWeight: valueType == "Prąd" ? 'bold' : 'regular',
            }}>Prąd</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{
        width: '100%',
        paddingTop: 20,
      }}>
        <View style={{
          width: '100%',
          alignItems: 'center',
          marginTop: 20
        }}>
          <TextInput
            style={{
              width: 80,
              height: 60,
              backgroundColor: colors.grey_l,
              borderRadius: 10,
              textAlign: 'center',
              fontSize: 24
            }}
            onChangeText={valueType == "Moc" ? setPower : setCurrent}
            value={valueType == "Moc" ? power : current}
            keyboardType="numeric"
          />
          <Slider
            style={{width: '80%', height: 40, marginTop: 20}}
            minimumValue={10}
            maximumValue={80}
            minimumTrackTintColor={colors.primary}
            maximumTrackTintColor={colors.grey}
            value={power}
            onValueChange={(value) => valueType == "Moc" ? setPower(value.toFixed(0).toString()) : setCurrent(value.toFixed(0).toString())}
          />
        </View>
      </View>


      <TouchableOpacity 
        style={{
          width: '100%',
          height: 50,
          backgroundColor: colors.primary,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 20,
          marginBottom: 50
        }}
        onPress={() => onSubmit()}
      >
        <Text style={{
          color: colors.background,
          fontWeight: 'bold'
        }}>Znajdź kabel</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}
