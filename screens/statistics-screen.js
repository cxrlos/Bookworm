import { useFocusEffect } from '@react-navigation/core';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { Dimensions, ScrollView, Text, View } from 'react-native';
import { ContributionGraph } from 'react-native-chart-kit';
import { IconButton, Menu } from 'react-native-paper';
import { material } from 'react-native-typography';

import Shelf from '../components/shelf';
import Time from '../components/time';

import volumes from '../data/volumes';

const StatisticsScreen = ({ navigation, route }) => {
  const { name } = route.params;

  const menu = ['Hoy', 'Esta semana', 'Este mes', 'Este año'];

  const numDays = {
    'Esta semana': 7,
    'Este mes': 30,
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
    // strokeWidth: 2, // optional, default 3
    // barPercentage: 0.5,
    // useShadowColorFromDataset: false, // optional
  };

  const screenWidth = Dimensions.get('window').width;

  const [books, setBooks] = useState([]);

  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  useFocusEffect(
    useCallback(() => {
      setBooks(
        volumes.map(book => ({
          author: book.volumeInfo.authors.join(', '),
          description: book.volumeInfo.description,
          id: book.id,
          navigation: navigation,
          pageCount: book.volumeInfo.pageCount,
          thumbnail: book.volumeInfo.imageLinks.thumbnail,
          title: book.volumeInfo.title,
        }))
      );
    }, [])
  );

  useLayoutEffect(() => {
    menu.includes(name) &&
      navigation.setOptions({
        headerLeft: () => (
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={<IconButton icon="dots-horizontal" onPress={openMenu} />}
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

  const width =
    name === 'Este año'
      ? 49 + Math.round(numDays[name] / 7) * 21 + 32
      : screenWidth;

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <View
        style={{
          paddingVertical: 16,
          flex: 1,
        }}
      >
        {/* <Shelf books={books} title="Hello" /> */}
        <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
          <Text style={{ ...material.title, marginBottom: 12 }}>
            Estadísticas
          </Text>
          <View
            style={{
              alignItems: 'center',
              marginBottom: 12,
              flexDirection: 'row',
            }}
          >
            <Text style={{ ...material.body1, marginRight: 8 }}>
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
            <Text style={{ ...material.body1, marginRight: 8 }}>
              Páginas leídas:
            </Text>
            <Text style={material.headline}>100</Text>
          </View>
        </View>
        {Object.keys(numDays).includes(name) && (
          <View>
            <Text
              style={{
                ...material.title,
                marginBottom: 12,
                paddingHorizontal: 16,
              }}
            >
              Mapa de calor
            </Text>
            <ScrollView horizontal={true}>
              <ContributionGraph
                values={commitsData}
                endDate={new Date('2017-04-01')}
                numDays={numDays[name]}
                width={width}
                height={216}
                chartConfig={chartConfig}
                // squareSize={16}
                onDayPress={day =>
                  day.count > 0 &&
                  navigation.push('Estadísticas', {
                    name: day.date.toString(),
                  })
                }
                horizontal={true}
              />
            </ScrollView>
          </View>
        )}
      </View>
    </View>
  );
};

export default StatisticsScreen;
