import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, Alert } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

import { useIsFocused } from '@react-navigation/native';

//Firebase
import { auth, db } from '../firebase/firebase-config';
import { getDocs, collection } from "firebase/firestore";

export default function Issues({navigation}) {


  const {colors} = useTheme();
  const {isFocused} = useIsFocused();

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
        padding: 15
      }}>
        <Image
          source={{uri: item.image}}
          width={100}
          height={120}
          style={{
            borderRadius: 8,
          }}
        />
        <View style={{marginLeft: 15}}>
          <Text style={{
            color: colors.grey_d,
          }}>03.12.2023</Text>
          <Text style={{
            fontSize: 18,
            marginTop: 10
          }}>{item.desc}</Text>
        </View>
        
      </View>
    )
    
  }

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
          backgroundColor: colors.primary,
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
        }}>Zgłoś zdarzenie</Text>
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
