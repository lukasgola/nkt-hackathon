import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export default function Issues({navigation}) {


  const {colors} = useTheme();


  const Issue = () => {
    return(
      <View style={{
        width: '90%',
        height: 150,
        backgroundColor: colors.grey_l,
        borderRadius: 10,
        marginHorizontal: '5%',
        marginBottom: 10
      }}>
  
      </View>
    )
    
  }


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
      <Issue />
      <Issue />
      <Issue />
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
