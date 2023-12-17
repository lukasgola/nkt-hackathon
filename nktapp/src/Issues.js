import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, Dimensions } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

import { EmptyComponent } from '../components/EmptyComponent';

import { useIsFocused } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

//Firebase
import { auth, db } from '../firebase/firebase-config';
import { getDocs, collection } from "firebase/firestore";
import { useCurrentLocation } from '../providers/CurrentLocationProvider';

export default function Issues({navigation}) {


  const {colors} = useTheme();
  const {isFocused} = useIsFocused();
  const {currentLocation} = useCurrentLocation();

  const width = Dimensions.get('window').width;

  const [issues, setIssues] = useState([])

  const getIssues = async () => {
    const temp = [];
    const querySnapshot = await getDocs(collection(db, "users", auth.currentUser.uid, "issues"));
    querySnapshot.forEach((doc) => {      
        // doc.data() is never undefined for query doc snapshots
        const data = {
            ...doc.data(),
            id: doc.id,
        }
        temp.push(data);
    });
    setIssues(temp)
}



  const Issue = ({item}) => {
    return(
      <View style={{
        width: '90%',
        height: 150,
        backgroundColor: colors.grey_l,
        borderRadius: 10,
        marginHorizontal: '5%',
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15
      }}>
        <Image
          source={{uri: item.image}}
          width={0.25 * width}
          height={120}
          style={{
            borderRadius: 8,
          }}
        />
        <View style={{marginLeft: 15, width: '60%'}}>
          <Text style={{
            color: colors.grey_d,
          }}>03.12.2023</Text>
          <Text style={{
            fontSize: 18,
            marginTop: 10
          }}>{item.desc}</Text>
          <View style={{
            width: '100%',
            height: 40,
            backgroundColor: colors.primary,
            borderRadius: 10,
            marginTop: 20,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Text style={{
              color: colors.background,
              fontWeight: 'bold'
            }}>Oczekujace...</Text>
          </View>

        

        </View>
        
      </View>
    )
    
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => 
        <TouchableOpacity onPress={() => navigation.navigate('Map')}>
            <Ionicons name='map-outline' size={25} color={colors.primary}/>
        </TouchableOpacity>,
    });
}, []);

  React.useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
        getIssues();
    });
    return focusHandler;
    
}, [navigation]);


  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={{
          width: '90%',
          height: 50,
          backgroundColor: colors.secondary,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 20
        }}
        onPress={() => navigation.navigate('IssueRequest')}
      >
        <Text style={{
          color: colors.background,
          fontWeight: 'bold'
        }}>Zgłoś usterkę</Text>
      </TouchableOpacity>

      <View style={{
        width: '100%',
        padding: '5%'
      }}>
        <Text style={{color: colors.grey_d}}>Twoje ostatnie zgłoszenia</Text>
      </View>
      <View style={{
        width:'100%',
      }}>
        <FlatList
          data={issues}
          renderItem={({item}) => <Issue item={item} />}
          keyExtractor={item => item.id}
          ListEmptyComponent={<EmptyComponent/>}
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
