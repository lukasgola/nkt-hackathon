import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import { useTheme } from '../theme/ThemeProvider';

import Home from '../src/Home';
import ChooseScreen from '../src/ChooseScreen';
import CableResult from '../src/CableResult';



export default function HomeStack() {

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
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ChooseScreen" component={ChooseScreen} />
        <Stack.Screen name="CableResult" component={CableResult} />
    </Stack.Navigator>
  );
}