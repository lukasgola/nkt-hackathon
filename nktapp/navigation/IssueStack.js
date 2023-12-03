import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import Issues from '../src/Issues';
import IssueRequest from '../src/IssueRequest';
import { useTheme } from '../theme/ThemeProvider';

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
    </Stack.Navigator>
  );
}