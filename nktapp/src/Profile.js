import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

//Providers
import { useTheme } from '../theme/ThemeProvider';

//Firebase
import { auth } from '../firebase/firebase-config';
import { useCurrentUser } from '../providers/CurrentUserProvider';

export default function Profile() {

    const {colors} = useTheme();
    const {currentUser} = useCurrentUser();


  return (
    <View style={styles.container}>
        <View style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20
        }}>

            <Image
              source={require('../assets/default-user-icon-4.jpg')}
              width={50}
              height={50}
              resizeMode='contain'
              style={{
                width: 100,
                height: 100,
                marginBottom: 20,
              }}
            />
            <Text style={{fontWeight: 'bold'}}>{currentUser.firstName} {currentUser.secondName}</Text>
            <Text>{currentUser.email}</Text>
        </View>
        
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
            }}>Wyloguj się</Text>
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
