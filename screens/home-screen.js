import React, { useEffect, useLayoutEffect } from 'react';
import { Image, Text, View } from 'react-native';
import { Button, Divider, IconButton } from 'react-native-paper';
import { material } from 'react-native-typography';
import { useDispatch, useSelector } from 'react-redux';

import BookCard from '../components/book-card';
import { LIBRARY } from '../constants';
import ErrorScreen from './error-screen';
import { fetchUser, userSelector } from '../redux/slices/user-slice';
import Layout from '../components/layout';
import { fetchLibrary, librarySelector } from '../redux/slices/library-slice';
import ShelfHeader from '../components/shelf-header';
import { statisticsSelector } from '../redux/slices/statistics-slice';
import { getGreeting, getPages } from '../utils';

/**
 * Represents the home screen of the application
 * @param {Object} navigation - To create the stack navigation
 */

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchLibrary());
  }, [dispatch]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="magnify"
          onPress={() => navigation.navigate('Buscar')}
        />
      ),
    });
  });

  const { hasErrors, library } = useSelector(librarySelector);

  const { readingSessions } = useSelector(statisticsSelector);

  const {
    loading,
    user: { dailyGoal, firstName },
  } = useSelector(userSelector);

  const shelf = library.filter(book => book.shelfId === '3') || [];

  const pagesRead = readingSessions
    .filter(session => session.date === new Date().toISOString().split('T')[0])
    .reduce((acc, curr) => acc + curr.pagesRead, 0);

  const pagesLeft = dailyGoal - pagesRead;

  if (hasErrors) return <ErrorScreen />;

  return (
    <Layout
      isVerticallyCentered={shelf.length === 0}
      onRefresh={() => dispatch(fetchLibrary())}
      refreshing={loading}
    >
      <View style={{ padding: 16 }}>
        <>
          <Image
            resizeMode="center"
            source={require('../assets/undraw_Bibliophile_hwqc.png')}
            style={{
              height: 192,
              marginBottom: 16,
              width: '100%',
            }}
          />
          <Text
            style={{
              ...material.display1,
              marginBottom: 6,
              textAlign: 'center',
            }}
          >
            {getGreeting()}, {firstName}
          </Text>
          {pagesLeft > 0 ? (
            <Text
              style={{
                ...material.subheading,
                textAlign: 'center',
              }}
            >
              Tienes que leer{' '}
              <Text style={material.headline}>{dailyGoal - pagesRead}</Text>{' '}
              {getPages(pagesLeft)} más para completar tu objetivo diario.
            </Text>
          ) : (
            <Text
              style={{
                ...material.subheading,
                textAlign: 'center',
              }}
            >
              ¡Enhorabuena! Has completado tu objetivo diario.
            </Text>
          )}
        </>
        {shelf.length === 0 ? (
          <Button
            style={{ alignSelf: 'center', marginTop: 16 }}
            onPress={() => navigation.navigate('Buscar')}
          >
            Buscar libros
          </Button>
        ) : (
          <>
            <Divider style={{ marginVertical: 16 }} />
            <View style={{ marginBottom: 12 }}>
              <ShelfHeader length={shelf.length} title={LIBRARY['3']} />
            </View>
            {shelf.map(book => (
              <View key={book.bookId} style={{ marginVertical: 6 }}>
                <BookCard item={book} navigation={navigation} shelfId="3" />
              </View>
            ))}
          </>
        )}
      </View>
    </Layout>
  );
};

export default HomeScreen;
