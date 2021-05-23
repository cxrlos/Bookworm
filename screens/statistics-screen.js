import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, Text, View } from 'react-native';
import { ContributionGraph } from 'react-native-chart-kit';
import {
  Divider,
  IconButton,
  Menu,
  ProgressBar,
  withTheme,
} from 'react-native-paper';
import { material } from 'react-native-typography';
import { useDispatch, useSelector } from 'react-redux';

import { MONTHS } from '../constants';
import ErrorScreen from './error-screen';
import { formSelector } from '../redux/slices/form-slice';
import Layout from '../components/layout';
import {
  fetchReadingSessions,
  statisticsSelector,
} from '../redux/slices/statistics-slice';
import Time from '../components/time';
import {
  getFirstDateInCurrentMonth,
  getFirstDateInCurrentWeek,
  getFirstDateInCurrentYear,
  getLastDateInCurrentMonth,
  getLastDateInCurrentWeek,
  getLastDateInCurrentYear,
} from '../utils';
import { color } from 'react-native-reanimated';

const StatisticsScreen = ({ navigation, route, theme: { colors } }) => {
  const dispatch = useDispatch();

  const {
    userInfo: { dailyGoal },
  } = useSelector(formSelector);

  const { hasErrors, readingSessions, loading } =
    useSelector(statisticsSelector);

  const { name } = route.params;

  const menu = ['Hoy', 'Esta semana', 'Este mes', 'Este año'];

  useEffect(() => {
    dispatch(fetchReadingSessions());
  }, [dispatch]);

  useLayoutEffect(() => {
    menu.includes(name) &&
      navigation.setOptions({
        headerRight: () => (
          <Menu
            anchor={<IconButton icon="calendar" onPress={openMenu} />}
            onDismiss={closeMenu}
            visible={visible}
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

  const getDatesInBetween = (start, end) => {
    let datesInBetween = [],
      d;
    for (d = new Date(start); d <= new Date(end); d.setDate(d.getDate() + 1)) {
      datesInBetween.push(new Date(d).toISOString().split('T')[0]);
    }
    return datesInBetween;
  };

  const getEndDate = () => {
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

  const getHero = () => {
    switch (name) {
      case 'Hoy':
        return new Date().toISOString().split('T')[0];
      case 'Esta semana':
        return `${getFirstDateInCurrentWeek().toISOString().split('T')[0]} a ${
          getLastDateInCurrentWeek().toISOString().split('T')[0]
        }`;
      case 'Este mes':
        return MONTHS[getLastDateInCurrentMonth().getMonth()];
      case 'Este año':
        return getLastDateInCurrentYear().getFullYear();
      default:
        return name;
    }
  };

  const getStartDate = () => {
    let startDate;
    switch (name) {
      case 'Esta semana':
        startDate = getFirstDateInCurrentWeek();
        break;
      case 'Este mes':
        startDate = getFirstDateInCurrentMonth();
        break;
      case 'Este año':
        startDate = getFirstDateInCurrentYear();
        break;
    }
    return new Date(startDate.toISOString().split('T')[0]);
  };

  const getStatistics = type => {
    switch (name) {
      case 'Hoy':
        return readingSessions
          .filter(
            session => session.date === new Date().toISOString().split('T')[0]
          )
          .reduce((acc, curr) => acc + curr[type], 0);
      case 'Esta semana':
        return readingSessions
          .filter(session =>
            getDatesInBetween(
              getFirstDateInCurrentWeek().toISOString().split('T')[0],
              getLastDateInCurrentWeek().toISOString().split('T')[0]
            ).includes(session.date)
          )
          .reduce((acc, curr) => acc + curr[type], 0);
      case 'Este mes':
        return readingSessions
          .filter(session =>
            getDatesInBetween(
              getFirstDateInCurrentMonth().toISOString().split('T')[0],
              getLastDateInCurrentMonth().toISOString().split('T')[0]
            ).includes(session.date)
          )
          .reduce((acc, curr) => acc + curr[type], 0);
      case 'Este año':
        return readingSessions
          .filter(session =>
            getDatesInBetween(
              getFirstDateInCurrentYear().toISOString().split('T')[0],
              getLastDateInCurrentYear().toISOString().split('T')[0]
            ).includes(session.date)
          )
          .reduce((acc, curr) => acc + curr[type], 0);
      default:
        return readingSessions
          .filter(
            session =>
              session.date === new Date(name).toISOString().split('T')[0]
          )
          .reduce((acc, curr) => acc + curr[type], 0);
    }
  };

  const numDays = {
    'Esta semana': 7,
    'Este mes': getLastDateInCurrentMonth().getDate() + 1,
    'Este año': 365,
  };

  const chartConfig = {
    backgroundGradientFrom: colors.background,
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: colors.background,
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(0, 209, 178, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };

  const screenWidth = Dimensions.get('window').width;

  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const width = name === 'Este año' ? 1177 : screenWidth;

  if (hasErrors) return <ErrorScreen />;

  return (
    <Layout
      onRefresh={() => dispatch(fetchReadingSessions())}
      refreshing={loading}
    >
      <View style={{ padding: 16 }}>
        <>
          <Image
            resizeMode="center"
            source={require('../assets/undraw_book_lover_mkck.png')}
            style={{
              height: 192,
              marginBottom: 6,
              width: '100%',
            }}
          />
          <Text
            style={{
              ...material.display1,
              textAlign: 'center',
            }}
          >
            {getHero()}
          </Text>
          <Divider style={{ marginVertical: 16 }} />
        </>
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
          <Time time={getStatistics('time')} />
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
          <Text style={material.headline}>{getStatistics('count')}</Text>
        </View>
      </View>
      {Object.keys(numDays).includes(name) ? (
        <View key={name}>
          <Text
            style={{
              ...material.title,
              paddingHorizontal: 16,
            }}
          >
            Mapa de calor
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <ContributionGraph
              chartConfig={chartConfig}
              endDate={getEndDate()}
              height={216}
              numDays={numDays[name]}
              onDayPress={day =>
                navigation.push('Estadísticas', {
                  name:
                    typeof day.date === 'string'
                      ? day.date
                      : day.date.toISOString().split('T')[0],
                })
              }
              showOutOfRangeDays
              values={readingSessions}
              width={width}
            />
          </ScrollView>
        </View>
      ) : (
        <View key={name} style={{ marginHorizontal: 16 }}>
          <Text
            style={{
              ...material.title,
              marginBottom: 6,
            }}
          >
            Objetivo diario
          </Text>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ flexGrow: 1, flexShrink: 1, marginRight: 8 }}>
              <ProgressBar progress={getStatistics('count') / dailyGoal} />
            </View>
            <Text style={material.caption}>
              {getStatistics('count')}/{dailyGoal}
            </Text>
          </View>
        </View>
      )}
    </Layout>
  );
};

export default withTheme(StatisticsScreen);
