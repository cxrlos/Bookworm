import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from '@react-navigation/native';
import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Provider } from 'react-redux';

import HomeNavigator from './navigators/home-navigator';
import LibraryNavigator from './navigators/library-navigator';
import ProfileNavigator from './navigators/profile-navigator';
import rootReducer from './root-reducer';
import StatisticsNavigator from './navigators/statistics-navigator';

const Tab = createBottomTabNavigator();

const App = () => {
  const hideRoutes = ['Leyendo', 'Actualizar progreso'];

  const getTabBarVisibility = route => {
    const routeName = getFocusedRouteNameFromRoute(route) || '';
    if (hideRoutes.includes(routeName)) {
      return false;
    }
    return true;
  };

  const store = configureStore({ reducer: rootReducer });

  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Tab.Navigator screenOptions={{ default: false }}>
            <Tab.Screen
              name="Inicio"
              component={HomeNavigator}
              options={({ route }) => ({
                tabBarLabel: 'Inicio',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="home" color={color} size={26} />
                ),
                tabBarVisible: getTabBarVisibility(route),
              })}
            />
            <Tab.Screen
              name="Biblioteca"
              component={LibraryNavigator}
              options={({ route }) => ({
                tabBarLabel: 'Biblioteca',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons
                    name="book-multiple"
                    color={color}
                    size={26}
                  />
                ),
                tabBarVisible: getTabBarVisibility(route),
              })}
            />
            <Tab.Screen
              name="Estadísticas"
              component={StatisticsNavigator}
              options={({ route }) => ({
                tabBarLabel: 'Estadísticas',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons
                    name="google-analytics"
                    color={color}
                    size={26}
                  />
                ),
                tabBarVisible: getTabBarVisibility(route),
              })}
            />
            <Tab.Screen
              name="Perfil"
              component={ProfileNavigator}
              options={({ route }) => ({
                tabBarLabel: 'Perfil',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons
                    name="face-woman"
                    color={color}
                    size={26}
                  />
                ),
              })}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;
