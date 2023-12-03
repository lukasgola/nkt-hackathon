import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

//Providers
import { ThemeProvider } from './theme/ThemeProvider';
import { CurrentUserProvider } from './providers/CurrentUserProvider';

import BottomTabs from './navigation/BottomTabs';
import LoginStack from './navigation/LoginStack';

//Firebase
import { auth } from "./firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { InstalationProvider } from './providers/InstalationProvider';
import { WireCountProvider } from './providers/WireCountProvider';
import { CurrentLocationProvider } from './providers/CurrentLocationProvider';

export default function App() {


  const [isUser, setIsUser] = useState(true);

  useEffect(() => {
      onAuthStateChanged(auth, (user) => {
      if(user) {
          setIsUser(true);
      }
      else setIsUser(false);
      })
  }, [])

  const toastConfig = {
    /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
    success: (props) => (
      <BaseToast
        {...props}
        style={{ marginTop: 20, borderRadius: 10, borderLeftColor: 'green' }}
        contentContainerStyle={{ paddingHorizontal: 15, backgroundColor: 'black', borderRadius: 10 }}
        text1Style={{
          color: 'white',
          fontSize: 20,
          fontWeight: '400'
        }}
        text2Style={{
          fontSize: 18
        }}
      />
    ),
    /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
    error: (props) => (
      <ErrorToast
        {...props}
        style={{ marginTop: 20, borderRadius: 10, borderLeftColor: 'red' }}
        contentContainerStyle={{ paddingHorizontal: 15, backgroundColor: 'black', borderRadius: 10 }}
        text1Style={{
          color: 'white',
          fontSize: 20,
          fontWeight: '400'
        }}
        text2Style={{
          fontSize: 18
        }}
      />
    ),
    /*
      Or create a completely new type - `tomatoToast`,
      building the layout from scratch.
  
      I can consume any custom `props` I want.
      They will be passed when calling the `show` method (see below)
    */
    tomatoToast: ({ text1, props }) => (
      <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
        <Text>{text1}</Text>
        <Text>{props.uuid}</Text>
      </View>
    )
  };

  return (
    <>
    <NavigationContainer>
      <ThemeProvider>
        <CurrentUserProvider>
          <InstalationProvider>
            <WireCountProvider>
            <CurrentLocationProvider>
            {isUser ? <BottomTabs/> : <LoginStack/> }
            </CurrentLocationProvider>
            </WireCountProvider>
          </InstalationProvider>
        </CurrentUserProvider>
      </ThemeProvider>
    </NavigationContainer>
    <Toast config={toastConfig}/>
    </>
  );
}

