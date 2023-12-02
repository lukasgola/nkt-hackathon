import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

//Providers
import { ThemeProvider } from './theme/ThemeProvider';
import { CurrentUserProvider } from './providers/CurrentUserProvider';

import BottomTabs from './navigation/BottomTabs';
import LoginStack from './navigation/LoginStack';

//Firebase
import { auth } from "./firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";

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

  return (
    <NavigationContainer>
      <ThemeProvider>
        <CurrentUserProvider>
          {isUser ? <BottomTabs /> : <LoginStack/> }
        </CurrentUserProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
}

