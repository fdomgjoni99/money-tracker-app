import React, {useContext} from 'react';
import {Animated, Text, View} from 'react-native';
// import theme, { padding} from './theme';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import Statistics from '../screens/Statistics';
import Transaction from '../screens/Transaction';
import Login from '../screens/Login';
import {ThemeContext} from '../contexts/theme';

const Tab = createBottomTabNavigator();

const BottomTabs = ({navigation}) => {
  const theme = useContext(ThemeContext);
  return (
    <SafeAreaProvider>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            borderTopColor: theme.colors.background,
            borderTopWidth: 2,
            backgroundColor: theme.colors.raisedBackground,
            elevation: 20,
            shadowColor: 'black',
            height: 64,
          },
        }}>
        <Tab.Screen
          name="Home2"
          component={Statistics}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Icon name="home" size={28} color={theme.colors.secondaryText} />
                <View style={{height: 3, width: 14, marginTop: 4, backgroundColor: focused ? theme.colors.secondaryText : 'transparent', borderRadius: 10}}>
                </View>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Statistics}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Icon name="pie-chart" size={28} color={theme.colors.secondaryText} />
                <View style={{height: 3, width: 14, marginTop: 4, backgroundColor: focused ? theme.colors.secondaryText : 'transparent', borderRadius: 10}}>
                </View>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="asdads"
          component={Transaction}
          options={{
            tabBarIcon: focused => (
              <View
                style={{
                  position: 'absolute',
                  borderRadius: 100,
                  elevation: 6,
                  shadowColor: '#8E54E9',
                  bottom: 38,
                }}>
                <LinearGradient
                  start={{x: 1, y: 0}}
                  end={{x: 0, y: 1}}
                  colors={['#4776E6', '#8E54E9']}
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 100,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Icon
                    style={{color: 'white', fontSize: 28}}
                    name="add-outline"
                  />
                </LinearGradient>
              </View>
            ),
          }}
          listeners={{
            tabPress: e => {
              e.preventDefault();
              navigation.navigate('transaction');
            },
          }}
        />
        <Tab.Screen
          name="dsada"
          component={Statistics}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Icon name="grid" size={28} color={theme.colors.secondaryText} />
                <View style={{height: 3, width: 14, marginTop: 4, backgroundColor: focused ? theme.colors.secondaryText : 'transparent', borderRadius: 10}}>
                </View>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Login"
          component={Login}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Icon name="settings" size={28} color={theme.colors.secondaryText} />
                <View style={{height: 3, width: 14, marginTop: 4, backgroundColor: focused ? theme.colors.secondaryText : 'transparent', borderRadius: 10}}>
                </View>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
};

export default BottomTabs;
