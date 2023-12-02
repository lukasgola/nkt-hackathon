import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '../theme/ThemeProvider';

export default function App() {

    const {colors} = useTheme();

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
