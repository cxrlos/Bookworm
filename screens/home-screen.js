import { useFocusEffect } from '@react-navigation/core';
import React, { useCallback, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { material } from 'react-native-typography';

import BookCard from '../components/book-card';

import volumes from '../data/volumes';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const HomeScreen = ({ navigation }) => {
  const [books, setBooks] = useState([]);

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

  return (
    <ScrollView>
      <View style={{ padding: 16, backgroundColor: 'white' }}>
        <View style={{ marginBottom: 16 }}>
          <Text style={material.title}>Buenos días, Daniela</Text>
          <Text style={material.subheading}>
            Te faltan 10 páginas para completar tu meta del día.
          </Text>
        </View>
        <View style={{ marginBottom: 6 }}>
          <Text style={material.title}>Leyendo ahora</Text>
        </View>
        {books.map(book => (
          <View key={book.id} style={{ marginVertical: 6 }}>
            <BookCard item={book} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
