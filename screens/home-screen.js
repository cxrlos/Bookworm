import { useFocusEffect } from '@react-navigation/core';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Divider, IconButton } from 'react-native-paper';
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
          author: book.volumeInfo.authors,
          currentPage: book.currentPage,
          description: book.volumeInfo.description,
          id: book.id,
          pageCount: book.volumeInfo.pageCount,
          publisher: book.volumeInfo.publisher,
          thumbnail: book.volumeInfo.imageLinks.thumbnail,
          title: book.volumeInfo.title,
        }))
      );
    }, [])
  );

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

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View style={{ padding: 16 }}>
        <View style={{ marginBottom: 16 }}>
          <Text style={{ ...material.title, marginBottom: 12 }}>
            Buenos días, Daniela
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Text style={material.subheading}>
              Te faltan 10 páginas para completar tu objetivo diario.
            </Text>
          </View>
        </View>
        <Divider />
        <View style={{ marginBottom: 6, paddingTop: 16 }}>
          <Text style={material.title}>Leyendo ahora</Text>
        </View>
        {books.map(book => (
          <View key={book.id} style={{ marginVertical: 6 }}>
            <BookCard item={book} navigation={navigation} shelf="3" />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
