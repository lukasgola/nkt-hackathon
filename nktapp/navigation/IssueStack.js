import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import { useTheme } from '../theme/ThemeProvider';

import Issues from '../src/Issues';
import IssueRequest from '../src/IssueRequest';
import Map from '../src/Map';



export default function IssueStack() {

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
        <Stack.Screen 
          name="Issues" 
          component={Issues} 
          options={{
            headerTitle: 'Usterki'
          }}
        />
        <Stack.Screen 
          name="IssueRequest" 
          component={IssueRequest} 
          options={{
            headerTitle: 'Zgłoś usterkę'
          }}
        />
        <Stack.Screen 
          name="Map" 
          component={Map} 
          options={{
            headerTitle: 'Mapa'
          }}
        />
    </Stack.Navigator>
  );
}