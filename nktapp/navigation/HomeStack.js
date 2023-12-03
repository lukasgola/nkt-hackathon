import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


import Home from '../src/Home';
import ChooseScreen from '../src/ChooseScreen';
import { useTheme } from '../theme/ThemeProvider';

export default function HomeStack() {

  const {colors} = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.primary
      }}
    >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ChooseScreen" component={ChooseScreen} />
    </Stack.Navigator>
  );
}