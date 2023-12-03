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
        headerTintColor: colors.primary
      }}
    >
        <Stack.Screen name="Issues" component={Issues} />
        <Stack.Screen name="IssueRequest" component={IssueRequest} />
    </Stack.Navigator>
  );
}