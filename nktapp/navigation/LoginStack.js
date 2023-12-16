import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import SignIn from '../src/SignIn';

export default function LoginStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SignIn" component={SignIn}
        options={{
          headerTitle: 'Zaloguj się'
        }}
      />
    </Stack.Navigator>
  );
}