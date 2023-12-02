import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

//Providers
import { useTheme } from '../theme/ThemeProvider';

//Firebase
import { auth } from '../firebase/firebase-config';

export default function Profile() {

    const {colors} = useTheme();


  return (
    <View style={styles.container}>
        <TouchableOpacity
            style={{
                width: '50%',
                height: 50,
                backgroundColor: colors.primary,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center'
            }}
            onPress={() => auth.signOut().then(() => console.log('User signed out!'))}
        >
            <Text style={{
                fontWeight: 'bold',
                color: colors.background
            }}>Sign Out</Text>
        </TouchableOpacity>
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
