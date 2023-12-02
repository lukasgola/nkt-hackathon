import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


import Home from '../src/Home';
import ChooseScreen from '../src/ChooseScreen';

export default function HomeStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ChooseScreen" component={ChooseScreen} />
    </Stack.Navigator>
  );
}