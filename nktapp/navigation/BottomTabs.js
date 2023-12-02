import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

import Home from '../src/Home';

export default function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
    </Tab.Navigator>
  );
}