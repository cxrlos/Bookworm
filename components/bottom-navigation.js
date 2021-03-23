import React, { useState } from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

const HomeRoute = () => <Text>Home</Text>;
const LibraryRoute = () => <Text>Biblioteca</Text>;
const StatisticsRoutes = () => <Text>Estadísticas</Text>;
const ProfilesRoute = () => <Text>Perfil</Text>;

const BottomNavigationMenu = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'home', title: 'Home', icon: 'book' },
    { key: 'library', title: 'Biblioteca', icon: 'book' },
    { key: 'satistics', title: 'Estadísticas', icon: 'book' },
    { key: 'profile', title: 'Perfil', icon: 'face' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    library: LibraryRoute,
    satistics: StatisticsRoutes,
    profile: ProfilesRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default BottomNavigationMenu;
