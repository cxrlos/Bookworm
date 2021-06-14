import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';

import rootReducer from './redux/reducers';
import SignInScreen from './screens/sign-in-screen';
import SignUpScreen from './screens/sign-up-screen';
import TabNavigator from './navigators/tab-navigator';
import StartScreen from './screens/start-screen';

const Stack = createStackNavigator();

const App = () => {
  const store = configureStore({ reducer: rootReducer });

  const theme = {
    ...DefaultTheme,
    roundness: 4,
    colors: {
      ...DefaultTheme.colors,
      accent: '#3e8ed0',
      background: '#fff',
      danger: '#f14668',
      error: '#f14668',
      greyLight: '#b5b5b5',
      greyLighter: '#dbdbdb',
      primary: '#00d1b2',
    },
  };

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              component={StartScreen}
              name="Bienvenida"
              options={{ headerShown: false }}
            />
            <Stack.Screen component={SignInScreen} name="Inicio de sesión" />
            <Stack.Screen component={SignUpScreen} name="Registro" />
            <Stack.Screen
              component={TabNavigator}
              name="App"
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;
