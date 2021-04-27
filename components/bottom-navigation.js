import React, { useState } from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeRoute = () => <></>;
const LibraryRoute = () => <></>;
const StatisticsRoutes = () => <></>;
const ProfilesRoute = () => <></>;

export default () => {
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: 'home', title: 'Inicio', icon: 'home' },
    { key: 'library', title: 'Biblioteca', icon: 'bookshelf' },
    {
      key: 'statistics',
      title: 'Estadísticas',
      icon: 'chart-pie',
    },
    { key: 'profile', title: 'Perfil', icon: 'face' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    library: LibraryRoute,
    statistics: StatisticsRoutes,
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
