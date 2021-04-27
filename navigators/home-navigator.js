import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import BookScreen from '../screens/book-screen';
import HomeScreen from '../screens/home-screen';
import NavigationBar from '../components/navigation-bar';
import ReadingScreen from '../screens/reading-screen';

const Stack = createStackNavigator();

const HomeNavigator = () => (
  <Stack.Navigator
  // screenOptions={{ header: props => <NavigationBar {...props} /> }}
  >
    <Stack.Screen name="Inicio" component={HomeScreen} />
    <Stack.Screen name="Libro" component={BookScreen} />
    <Stack.Screen name="Leyendo" component={ReadingScreen} />
  </Stack.Navigator>
);

export default HomeNavigator;
