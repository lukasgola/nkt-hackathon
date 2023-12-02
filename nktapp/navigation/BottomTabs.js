import { View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Tab = createBottomTabNavigator();

import Home from '../src/Home';
import History from '../src/History';
import Profile from '../src/Profile';

import IssueStack from './IssueStack';

import { useTheme } from '../theme/ThemeProvider';

export default function BottomTabs() {

    const { colors } = useTheme();

    const Item = (props) => {
        return(
            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Ionicons name={props.focused ? props.filled : props.icon} size={22} color={props.focused ? colors.primary : colors.grey} />
            </View>
        )
    }

  return (
    <Tab.Navigator
    screenOptions={{
        tabBarStyle: {
            backgroundColor: colors.background,
            height: 70,
        },
        tabBarItemStyle:{
            height: 50,
        },
        tabBarShowLabel: true,
        tabBarLabelStyle:{
            color: colors.text,
        },
        tabBarIconStyle: {
            alignItems: 'center',
            justifyContent: 'center',
        },
        tabBarIndicatorStyle:{
        position: 'absolute',
        top: 0,
        backgroundColor: colors.primary
        },
        swipeEnabled: false,
        
    }}
    >
      <Tab.Screen name="Home" component={Home} options={{
                tabBarIcon: ({focused}) => (
                    <Item focused={focused} icon='home-outline' filled='home' title='Home' />
                ),
                
        }}/>
      <Tab.Screen name="History" component={History} options={{
                tabBarIcon: ({focused}) => (
                    <Item focused={focused} icon='file-tray-full-outline' filled='file-tray-full' title='Home' />
                ),
                
                
        }}/>
      <Tab.Screen name="IssuesStack" component={IssueStack} options={{
                tabBarIcon: ({focused}) => (
                    <Item focused={focused} icon='alert-outline' filled='alert' title='Home' />
                ),
                headerShown: false
                
        }}/>
        <Tab.Screen name="Profile" component={Profile} options={{
                    tabBarIcon: ({focused}) => (
                        <Item focused={focused} icon='person-outline' filled='person' title='Home' />
                    ),
                    
            }}/>
    </Tab.Navigator>
  );
}