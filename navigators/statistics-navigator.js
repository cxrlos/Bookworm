import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ShelfScreen from '../screens/shelf-screen';

import StatisticsScreen from '../screens/statistics-screen';

const Stack = createStackNavigator();

const StatisticsNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Estadísticas"
      component={StatisticsScreen}
      initialParams={{ name: 'Hoy' }}
      options={({ route }) => ({ title: route.params.name })}
    />
    <Stack.Screen
      name="Estantería"
      component={ShelfScreen}
      options={({ route }) => ({ title: route.params.name })}
    />
  </Stack.Navigator>
);

export default StatisticsNavigator;
