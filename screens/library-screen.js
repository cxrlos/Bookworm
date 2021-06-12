import React, { Fragment, useEffect, useLayoutEffect } from 'react';
import { Image, Text } from 'react-native';
import { Button, Divider, IconButton } from 'react-native-paper';
import { material } from 'react-native-typography';
import { useDispatch, useSelector } from 'react-redux';

import ErrorScreen from './error-screen';
import Layout from '../components/layout';
import { fetchLibrary, librarySelector } from '../redux/slices/library-slice';
import Shelf from '../components/shelf';

/**
 * Represents the user's library screen with the shelves
 * @param {Object} navigation - To create the stack navigation
 */

const LibraryScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const { hasErrors, library, loading } = useSelector(librarySelector);

  useEffect(() => {
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

  const shelves = library && Object.keys(library);

  const totalBooks =
    library &&
    shelves
      .map(shelfId => library[shelfId].length)
      .reduce((acc, curr) => acc + curr);

  const Hero = () => (
    <>
      <Image
        resizeMode="center"
        source={require('../assets/undraw_Bookshelves_re_lxoy.png')}
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
        Sin libros
      </Text>
      <Text
        style={{
          ...material.subheading,
          marginBottom: 16,
          textAlign: 'center',
        }}
      >
        Tu biblioteca está vacía.
      </Text>
      <Button
        style={{ alignSelf: 'center' }}
        onPress={() => navigation.navigate('Buscar')}
      >
        Buscar libros
      </Button>
    </>
  );

  if (hasErrors) return <ErrorScreen />;

  return (
    <Layout
      isVerticallyCentered={totalBooks === 0}
      onRefresh={() => dispatch(fetchLibrary())}
      refreshing={loading}
    >
      {totalBooks === 0 ? (
        <Hero />
      ) : (
        shelves.map(shelfId => (
          <Fragment key={shelfId}>
            {library[shelfId].length > 0 && (
              <>
                <Shelf
                  books={library[shelfId]}
                  navigation={navigation}
                  shelfId={shelfId}
                />
                <Divider style={{ marginHorizontal: 16 }} />
              </>
            )}
          </Fragment>
        ))
      )}
    </Layout>
  );
};

export default LibraryScreen;
