import React, { useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import { Button, Divider } from 'react-native-paper';
import { material } from 'react-native-typography';
import { useDispatch, useSelector } from 'react-redux';

import BookCard from '../components/book-card';
import { LIBRARY } from '../constants';
import Layout from '../components/layout';
import { fetchShelfById, librarySelector } from '../redux/slices/library-slice';
import { getShelfLength, getGreeting } from '../utils';
import ShelfHeader from '../components/shelf-header';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { hasErrors, library, loading, shelfId } = useSelector(librarySelector);

  useEffect(() => {
    dispatch(fetchShelfById('3'));
  }, [dispatch]);

  const shelf = library[shelfId] || [];

  const Hero = () => (
    <>
      <Image
        resizeMode="center"
        source={require('../assets/undraw_reading_time_gvg0.png')}
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
        {getGreeting()}
      </Text>
      <Text
        style={{
          ...material.subheading,
          marginBottom: 16,
          textAlign: 'center',
        }}
      >
        Tienes que leer <Text style={material.headline}>10</Text> páginas más
        para completar tu objetivo diario.
      </Text>
      <Button
        style={{ alignSelf: 'center' }}
        onPress={() => navigation.navigate('Buscar')}
      >
        Buscar libros
      </Button>
    </>
  );

  if (hasErrors)
    return (
      <View>
        <Text>Error</Text>
      </View>
    );

  return (
    <Layout
      isVerticallyCentered={shelf.length === 0}
      onRefresh={() => dispatch(fetchShelfById('3'))}
      refreshing={loading}
    >
      <View style={{ padding: 16 }}>
        <Hero />
        {shelf.length > 0 && (
          <>
            <Divider style={{ marginVertical: 16 }} />
            <View style={{ marginBottom: 12 }}>
              <ShelfHeader length={shelf.length} title={LIBRARY['3']} />
            </View>
            {shelf.map(book => (
              <View key={book.id} style={{ marginVertical: 6 }}>
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
