import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export default function Issues({navigation}) {


  const {colors} = useTheme();

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
          marginTop: 10
        }}
        onPress={() => navigation.navigate('IssueRequest')}
      >
        <Text style={{
          color: colors.background,
          fontWeight: 'bold'
        }}>Zgłoś zdarzenie</Text>
      </TouchableOpacity>
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
