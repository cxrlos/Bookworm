import { useFocusEffect } from '@react-navigation/core';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { Dimensions, ScrollView, Text, View } from 'react-native';
import { ContributionGraph } from 'react-native-chart-kit';
import { Divider, IconButton, Menu, ProgressBar } from 'react-native-paper';
import { material } from 'react-native-typography';

import Time from '../components/time';

const StatisticsScreen = ({ navigation, route }) => {
  const { name } = route.params;

  const menu = ['Hoy', 'Esta semana', 'Este mes', 'Este año'];

  const getLastDateInCurrentWeek = () => {
    const d = new Date().toISOString().split('T')[0];
    const currentDate = new Date(d);
    return new Date(
      currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 6)
    );
  };

  const getLastDateInCurrentMonth = () => {
    const d = new Date().toISOString().split('T')[0];
    const currentDate = new Date(d);
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    return new Date(currentYear, currentMonth + 1, -1);
  };

  const getLastDateInCurrentYear = () => {
    return new Date(new Date().getFullYear(), 11, 31);
  };

  const handleEndDate = () => {
    let endDate;
    switch (name) {
      case 'Esta semana':
        endDate = getLastDateInCurrentWeek();
        break;
      case 'Este mes':
        endDate = getLastDateInCurrentMonth();
        break;
      case 'Este año':
        endDate = getLastDateInCurrentYear();
        break;
    }
    return new Date(endDate.toISOString().split('T')[0]);
  };

  const numDays = {
    'Esta semana': 7,
    'Este mes': getLastDateInCurrentMonth().getDate() + 1,
    'Este año': 365,
  };

  const commitsData = [
    { date: '2017-01-02', count: 1 },
    { date: '2017-01-02', count: 1 },
    { date: '2017-01-03', count: 2 },
    { date: '2017-01-04', count: 3 },
    { date: '2017-01-05', count: 4 },
    { date: '2017-01-06', count: 5 },
    { date: '2017-01-30', count: 2 },
    { date: '2017-01-31', count: 3 },
    { date: '2017-03-01', count: 2 },
    { date: '2017-04-02', count: 4 },
    { date: '2017-03-05', count: 2 },
    { date: '2017-02-30', count: 4 },
  ];

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: '#fff',
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };

  const screenWidth = Dimensions.get('window').width;

  const [books, setBooks] = useState([]);

  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  useLayoutEffect(() => {
    menu.includes(name) &&
      navigation.setOptions({
        headerRight: () => (
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={<IconButton icon="calendar" onPress={openMenu} />}
          >
            {menu.map(name => (
              <Menu.Item
                key={name}
                onPress={() => {
                  navigation.navigate('Estadísticas', { name });
                  closeMenu();
                }}
                title={name}
              />
            ))}
          </Menu>
        ),
      });
  });

  const width = name === 'Este año' ? 1177 : screenWidth;

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View style={{ padding: 16 }}>
        <Text style={{ ...material.display1, marginBottom: 32 }}>Mayo</Text>
        <Text style={{ ...material.title, marginBottom: 6 }}>Estadísticas</Text>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
        >
          <Text style={{ ...material.subheading, marginRight: 8 }}>
            Tiempo leído:
          </Text>
          <Time time={0} />
        </View>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
          }}
        >
          <Text style={{ ...material.subheading, marginRight: 8 }}>
            Páginas leídas:
          </Text>
          <Text style={material.headline}>100</Text>
        </View>
      </View>
      {Object.keys(numDays).includes(name) ? (
        <View key={name} style={{ paddingTop: 16 }}>
          <Text
            style={{
              ...material.title,
              marginBottom: 6,
              paddingHorizontal: 16,
            }}
          >
            Mapa de calor
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <ContributionGraph
              values={commitsData}
              endDate={handleEndDate()}
              numDays={numDays[name]}
              width={width}
              height={216}
              chartConfig={chartConfig}
              onDayPress={day =>
                navigation.push('Estadísticas', {
                  name: `${day.date.toISOString().split('T')[0]}`,
                })
              }
              showOutOfRangeDays
            />
          </ScrollView>
        </View>
      ) : (
        <View key={name} style={{ padding: 16 }}>
          <Text
            style={{
              ...material.title,
              marginBottom: 6,
            }}
          >
            Objetivo diario
          </Text>
          <Text style={{ ...material.subheading, marginBottom: 12 }}>
            Te faltan 10 páginas para completar tu objetivo diario.
          </Text>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ flexGrow: 1, flexShrink: 1, marginRight: 8 }}>
              <ProgressBar progress={0.0} />
            </View>
            <Text style={material.caption}>0 de 10</Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default StatisticsScreen;
