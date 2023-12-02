import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import Issues from '../src/Issues';
import IssueRequest from '../src/IssueRequest';

export default function IssueStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Issues" component={Issues} />
        <Stack.Screen name="IssueRequest" component={IssueRequest} />
    </Stack.Navigator>
  );
}