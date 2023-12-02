import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { ThemeProvider } from './theme/ThemeProvider';

import BottomTabs from './navigation/BottomTabs';
import LoginStack from './navigation/LoginStack';
//import LoginStack from './navigation/LoginStack';

export default function App() {
  return (
    <NavigationContainer>
      <ThemeProvider>
        <LoginStack/>
      </ThemeProvider>
    </NavigationContainer>
  );
}

