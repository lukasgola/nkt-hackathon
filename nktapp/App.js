import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { ThemeProvider } from './theme/ThemeProvider';
import BottomTabs from './navigation/BottomTabs';

export default function App() {
  return (
    <NavigationContainer>
      <ThemeProvider>
        <BottomTabs/>
      </ThemeProvider>
    </NavigationContainer>
  );
}

