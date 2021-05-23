import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import FormScreen from '../screens/form-screen';
import ProfileScreen from '../screens/profile-screen';

const Stack = createStackNavigator();

const ProfileNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Perfil"
      component={ProfileScreen}
      options={{ headerLeft: null }}
    />
    <Stack.Screen
      name="Formulario"
      component={FormScreen}
      options={({ route }) => ({ title: route.params.name })}
    />
  </Stack.Navigator>
);

export default ProfileNavigator;
