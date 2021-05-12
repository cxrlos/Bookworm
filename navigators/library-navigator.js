import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import BookScreen from '../screens/book-screen';
import LibraryScreen from '../screens/library-screen';
import ProgressScreen from '../screens/progress-screen';
import ReadingScreen from '../screens/reading-screen';
import SearchScreen from '../screens/search-screen';
import ShelfScreen from '../screens/shelf-screen';

import { LIBRARY } from '../constants';

const Stack = createStackNavigator();

const LibraryNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Biblioteca" component={LibraryScreen} />
    <Stack.Screen name="Buscar" component={SearchScreen} />
    <Stack.Screen
      name="Libro"
      component={BookScreen}
      options={() => ({ title: null })}
    />
    <Stack.Screen
      name="Estantería"
      component={ShelfScreen}
      options={({ route }) => ({ title: LIBRARY[route.params.shelfId] })}
    />
    <Stack.Screen
      name="Leyendo"
      component={ReadingScreen}
      options={() => ({ title: null })}
    />
    <Stack.Screen name="Actualizar progreso" component={ProgressScreen} />
  </Stack.Navigator>
);

export default LibraryNavigator;
