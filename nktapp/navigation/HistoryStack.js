import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import { useTheme } from '../theme/ThemeProvider';

import History from '../src/History';
import CableResult from '../src/CableResult';



export default function HistoryStack() {

  const {colors} = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.primary,
        headerTitleStyle:{
          color: colors.text
        }
      }}
    >
        <Stack.Screen name="History" component={History}
          options={{
            headerTitle: 'Historia'
          }}
        />

        <Stack.Screen name="CableResult2" component={CableResult}
          options={{
            headerTitle: 'Wynik'
          }}
        />
    </Stack.Navigator>
  );
}