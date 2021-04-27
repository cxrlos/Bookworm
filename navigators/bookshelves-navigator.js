import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { IconButton } from 'react-native-paper';

import BookScreen from '../screens/book-screen';
import BookshelfScreen from '../screens/bookshelf-screen';
import BookshelvesScreen from '../screens/bookshelves-screen';
import ProgressScreen from '../screens/progress-screen';
import ReadingScreen from '../screens/reading-screen';

const Stack = createStackNavigator();

const BookshelvesNavigator = () => (
  <Stack.Navigator
  // screenOptions={{ header: props => <NavigationBar {...props} /> }}
  >
    <Stack.Screen name="Biblioteca" component={BookshelvesScreen} />
    <Stack.Screen
      name="Libro"
      component={BookScreen}
      options={() => ({ title: null })}
    />
    <Stack.Screen
      name="Librero"
      component={BookshelfScreen}
      options={({ route }) => ({ title: route.params.name })}
    />
    <Stack.Screen
      name="Leyendo"
      component={ReadingScreen}
      options={() => ({ title: null })}
    />
    <Stack.Screen name="Actualizar progreso" component={ProgressScreen} />
  </Stack.Navigator>
);

export default BookshelvesNavigator;
