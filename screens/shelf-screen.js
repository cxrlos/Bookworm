import { useFocusEffect } from '@react-navigation/core';
import React, { useCallback, useState } from 'react';
import { ScrollView, View } from 'react-native';

import BookCard from '../components/book-card';

import volumes from '../data/volumes';

const ShelfScreen = ({ navigation, route }) => {
  const { shelf } = route.params;

  const [books, setBooks] = useState([]);

  useFocusEffect(
    useCallback(() => {
      setBooks(
        volumes.map(book => ({
          author: book.volumeInfo.authors,
          description: book.volumeInfo.description,
          currentPage: book.currentPage,
          id: book.id,
          navigation: navigation,
          pageCount: book.volumeInfo.pageCount,
          publisher: book.volumeInfo.publisher,
          thumbnail: book.volumeInfo.imageLinks.thumbnail,
          title: book.volumeInfo.title,
        }))
      );
    }, [])
  );

  return (
    <ScrollView>
      <View style={{ padding: 16 }}>
        {books.map(book => (
          <View key={book.id} style={{ marginVertical: 6 }}>
            <BookCard item={book} navigation={navigation} shelf={shelf} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default ShelfScreen;
