/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import Statistics from './screens/Statistics';
import Transaction from './screens/Transaction';
import Login from './screens/Login';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SelectCategory from './screens/SelectCategory';
import BottomTabs from './components/BottomTabs';
import {ThemeContext, theme, darkTheme} from './contexts/theme';
import {StoreProvider, useStoreState, useStoreRehydrated} from 'easy-peasy';
import store from './store';

const Main = () => {
  const Stack = createStackNavigator();
  const darkThemeMode = useStoreState(state => state.darkThemeMode);
  const user = useStoreState(state => state.user);
  return (
    <ThemeContext.Provider value={darkThemeMode ? darkTheme : theme}>
      <NavigationContainer
        theme={{colors: {background: darkThemeMode ? '#17223B' : '#f3f4f6'}}}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
            {user.token ? (
              <>
              <Stack.Screen name="Home" component={BottomTabs} />
              <Stack.Screen name="transaction" component={Transaction} />
              <Stack.Screen name="Settdsdsings" component={Statistics} />
              <Stack.Screen name="select_category" component={SelectCategory} />
              </>
            ): (
              <Stack.Screen name="Login" component={Login} />
            )}
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
};

function WaitForStateRehydration({children}) {
  const isRehydrated = useStoreRehydrated();
  return isRehydrated ? children : null;
}

const App = () => {
  return (
    <StoreProvider store={store}>
      <WaitForStateRehydration>
        <Main></Main>
      </WaitForStateRehydration>
    </StoreProvider>
  );
};

export default App;
