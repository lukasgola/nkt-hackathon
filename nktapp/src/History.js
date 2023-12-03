import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, Alert } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

import { useIsFocused } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

//Firebase
import { auth, db } from '../firebase/firebase-config';
import { getDocs, collection } from "firebase/firestore";
import { useCurrentLocation } from '../providers/CurrentLocationProvider';

import { getDataFromWires, setGlobalValues } from '../firebase/firebase-config';

export default function History({navigation}) {


  const {colors} = useTheme();
  const {isFocused} = useIsFocused();
  const {currentLocation} = useCurrentLocation();

  const [history, setHistory] = useState([])

  const getHistory = async () => {
    const temp = [];
    const querySnapshot = await getDocs(collection(db, "users", auth.currentUser.uid, "history"));
    querySnapshot.forEach((doc) => {      
        // doc.data() is never undefined for query doc snapshots
        const data = {
            ...doc.data(),
            id: doc.id,
        }
        temp.push(data);
    });
    setHistory(temp)
}


  React.useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
        getHistory();
    });
    return focusHandler;
    
  }, [navigation]);


  const onHistoryClick = async (input) => {
    console.log(input)
    setGlobalValues(input.instalation, input.airTemperature, input.wireCount, input.metalType, input.isolationType, input.power, input.current, input.groundTemperature, input.groundResistance)
    const result = getDataFromWires( 
      input.instalation,
      input.airTemperature,
      input.wireCount,
      input.metalType,
      input.isolationType,
      input.power,
      input.current,
      input.groundTemperature,
      input.groundResistance,)

      navigation.navigate('CableResult', {cables: result, input: input})
  }


  const InputRow = ({text, value}) => {
    if(value != null){
        return(
            <View style={{flexDirection: 'row'}}>
                <Text style={{fontWeight: 'bold'}}>{text} </Text>
                <Text> {value}</Text>
            </View>
            )
    }
  }

  const Item = ({input}) => {
    return(
      <TouchableOpacity 
        onPress={() => onHistoryClick(input) }
        style={{
          marginTop: 10,
          padding: 10,
          borderRadius: 10,
          backgroundColor: colors.background,
        }}
      >
          <InputRow value={input.instalation} text={'Typ instalacji:'} />
          <InputRow value={input.airTemperature} text={'Temperatura powietrza:'} />
          <InputRow value={input.groundTemperature} text={'Temperatura gruntu:'} />
          <InputRow value={input.groundResistance} text={'Rezystywność gruntu:'} />
          <InputRow value={input.wireCount} text={'Liczba zył obciązonych:'} />
          <InputRow value={input.metalType} text={'Metal zyły:'} />
          <InputRow value={input.isolationType} text={'Izolacja:'} />
          <InputRow value={input.power} text={'Moc:'} />
          <InputRow value={input.current} text={'Prąd:'} />
      </TouchableOpacity>
    )
  }


  return (
    <View style={{
      width: '100%',
      alignItems: 'center',
    }}>
      <View style={{
        width:'100%',
        padding: '5%'
      }}>
        <FlatList
          data={history}
          renderItem={({item}) => <Item input={item} />}
          keyExtractor={item => item.id}
        />
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    //justifyContent: 'center',
  },
});
