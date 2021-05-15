import React, { useEffect, useLayoutEffect } from 'react';
import { Image, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { material } from 'react-native-typography';
import { useDispatch, useSelector } from 'react-redux';

import BookCard from '../components/book-card';
import Layout from '../components/layout';
import {
  clearSearch,
  fetchGoogleBooks,
  searchSelector,
  setQuery,
} from '../redux/slices/search-slice';

const SearchScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const { books, hasErrors, loading, query } = useSelector(searchSelector);

  useEffect(() => {
    dispatch(clearSearch());
  }, []);

  useEffect(() => {
    dispatch(fetchGoogleBooks(query));
  }, [dispatch, query]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <TextInput
          autoFocus
          dense
          onChangeText={text => {
            dispatch(setQuery(text));
          }}
          placeholder="Buscar libros"
          right={<TextInput.Icon name="close" onPress={() => {}} />}
        />
      ),
    });
  });

  if (hasErrors)
    return (
      <View>
        <Text>Error</Text>
      </View>
    );

  return (
    <Layout refreshing={query.length > 0 && loading}>
      <View style={{ padding: 16 }}>
        {query.length === 0 ? (
          <View
            style={{
              alignItems: 'center',
              flex: 1,
              justifyContent: 'center',
            }}
          >
            <Image
              resizeMode="center"
              source={require('../assets/undraw_searching_p5ux.png')}
              style={{ height: 192, width: '100%', marginBottom: 12 }}
            />
            <Text style={{ ...material.subheading, textAlign: 'center' }}>
              Busca libros por título, autor, editorial o ISBN.
            </Text>
          </View>
        ) : (
          books.length > 0 &&
          books.map(book => (
            <View key={book.id} style={{ marginVertical: 6 }}>
              <BookCard item={book} navigation={navigation} />
            </View>
          ))
        )}
      </View>
    </Layout>
  );
};

export default SearchScreen;
