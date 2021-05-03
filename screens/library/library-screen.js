import React, { Fragment, useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Divider } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import Shelf from '../../components/shelf';
import { LIBRARY } from '../../constants';
import LoadingScreen from '../loading-screen';
import { fetchLibrary, librarySelector } from './library-slice';

const LibraryScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { hasErrors, library, loading } = useSelector(librarySelector);

  useEffect(() => {
    dispatch(fetchLibrary());
  }, [dispatch]);

  if (loading) return <LoadingScreen message="Cargando biblioteca..." />;

  if (hasErrors)
    return (
      <View>
        <Text>Error</Text>
      </View>
    );

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      {Object.keys(library).map(shelf => (
        <Fragment key={shelf}>
          <Shelf
            books={library[shelf]}
            navigation={navigation}
            shelf={shelf}
            title={LIBRARY[shelf]}
          />
          <Divider style={{ marginHorizontal: 16 }} />
        </Fragment>
      ))}
    </ScrollView>
  );
};

export default LibraryScreen;
