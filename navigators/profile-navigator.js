import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import ProfileScreen from '../screens/profile-screen';

const Stack = createStackNavigator();

const ProfileNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Perfil" component={ProfileScreen} />
  </Stack.Navigator>
);

export default ProfileNavigator;
