import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from '@react-navigation/native';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import BookshelvesNavigator from './navigators/bookshelves-navigator';
import HomeNavigator from './navigators/home-navigator';
import ProfileNavigator from './navigators/profile-navigator';
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

  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Inicio"
            component={HomeNavigator}
            options={{
              tabBarLabel: 'Inicio',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Biblioteca"
            component={BookshelvesNavigator}
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
            options={{
              tabBarLabel: 'Estadísticas',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="google-analytics"
                  color={color}
                  size={26}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Perfil"
            component={ProfileNavigator}
            options={{
              tabBarLabel: 'Perfil',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="face-woman"
                  color={color}
                  size={26}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
