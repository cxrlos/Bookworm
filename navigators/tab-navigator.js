import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUserInfo, formSelector } from '../redux/slices/form-slice';
import HomeNavigator from '../navigators/home-navigator';
import LibraryNavigator from '../navigators/library-navigator';
import ProfileNavigator from '../navigators/profile-navigator';
import StatisticsNavigator from '../navigators/statistics-navigator';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const dispatch = useDispatch();

  const {
    userInfo: { sex },
  } = useSelector(formSelector);

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  const hideRoutes = ['Leyendo', 'Libro', 'Actualizar progreso', 'Formulario'];

  const getTabBarVisibility = route => {
    const routeName = getFocusedRouteNameFromRoute(route) || '';
    if (hideRoutes.includes(routeName)) {
      return false;
    }
    return true;
  };

  return (
    <>
      <Tab.Navigator
        screenOptions={{ default: false }}
        tabBarOptions={{
          activeTintColor: '#000',
        }}
      >
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
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
            tabBarVisible: getTabBarVisibility(route),
          })}
        />
      </Tab.Navigator>
    </>
  );
};

export default TabNavigator;
