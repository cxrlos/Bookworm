import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import BookScreen from '../screens/book-screen';
import HomeScreen from '../screens/home-screen';
import ProgressScreen from '../screens/progress-screen';
import ReadingScreen from '../screens/reading-screen';
import SearchScreen from '../screens/search-screen';

import Search from '../components/search';

const Stack = createStackNavigator();

const HomeNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Inicio"
      component={HomeScreen}
      options={() => ({ headerLeft: null, title: 'Bookworm' })}
    />
    <Stack.Screen name="Buscar" component={SearchScreen} />
    <Stack.Screen
      name="Libro"
      component={BookScreen}
      options={() => ({ title: null })}
    />
    <Stack.Screen
      name="Leyendo"
      component={ReadingScreen}
      options={() => ({ title: null })}
    />
    <Stack.Screen name="Actualizar progreso" component={ProgressScreen} />
  </Stack.Navigator>
);

export default HomeNavigator;
