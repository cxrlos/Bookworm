import { useFocusEffect } from '@react-navigation/core';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Icon, TextInput } from 'react-native-paper';

import BookCard from '../components/book-card';

const SearchScreen = ({ navigation }) => {
  const [text, setText] = useState('');
  const [books, setBooks] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const fetchBooks = async () => {
        try {
          if (text.length > 0) {
            const endpoint = `https://www.googleapis.com/books/v1/volumes?q=${text}&key=AIzaSyC9nmes7DMUcALkQD67YXX_BLPUuDXFikA`;
            const res = await fetch(endpoint);
            const { items } = await res.json();
            if (items.length > 0) {
              setBooks(
                items.map(book => ({
                  authors: book.volumeInfo.authors,
                  description: book.volumeInfo.description,
                  currentPage: book.currentPage,
                  id: book.id,
                  navigation: navigation,
                  pageCount: book.volumeInfo.pageCount,
                  publisher: book.volumeInfo.publisher,
                  thumbnail:
                    book.volumeInfo.imageLinks &&
                    book.volumeInfo.imageLinks.thumbnail,
                  title: book.volumeInfo.title,
                }))
              );
            }
          }
        } catch (e) {
          console.warn(e);
        }
      };
      fetchBooks();
    }, [text])
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      animationEnabled: false,
      headerTitle: () => (
        <TextInput
          autoFocus
          dense
          onChangeText={text => setText(text)}
          placeholder="Buscar libros"
          ref={text => {
            setText(text);
          }}
          right={
            <TextInput.Icon
              name="close"
              onPress={() => {
                text.clear();
              }}
            />
          }
        />
      ),
    });
  });

  return (
    <ScrollView>
      <View style={{ padding: 16 }}>
        {books.map(book => (
          <View key={book.id} style={{ marginVertical: 6 }}>
            <BookCard item={book} navigation={navigation} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default SearchScreen;
