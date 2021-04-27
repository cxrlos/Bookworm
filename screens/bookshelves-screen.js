import { useFocusEffect } from '@react-navigation/core';
import React, { useCallback, useState } from 'react';
import { ScrollView, View } from 'react-native';
import Shelf from '../components/shelf';

import volumes from '../data/volumes';

const titles = {
  0: 'Favoritos',
  2: 'Por leer',
  3: 'Leyendo ahora',
  4: 'Leídos',
};

const BookshelvesScreen = ({ navigation }) => {
  const [bookshelves, setBookshelves] = useState({});

  useFocusEffect(
    useCallback(() => {
      setBookshelves({
        0: volumes.map(book => ({
          author: book.volumeInfo.authors.join(', '),
          description: book.volumeInfo.description,
          id: book.id,
          navigation: navigation,
          pageCount: book.volumeInfo.pageCount,
          publisher: book.volumeInfo.publisher,
          thumbnail: book.volumeInfo.imageLinks.thumbnail,
          title: book.volumeInfo.title,
        })),
        2: volumes.map(book => ({
          author: book.volumeInfo.authors.join(', '),
          description: book.volumeInfo.description,
          id: book.id,
          navigation: navigation,
          pageCount: book.volumeInfo.pageCount,
          publisher: book.volumeInfo.publisher,
          thumbnail: book.volumeInfo.imageLinks.thumbnail,
          title: book.volumeInfo.title,
        })),
        3: volumes.map(book => ({
          author: book.volumeInfo.authors.join(', '),
          description: book.volumeInfo.description,
          id: book.id,
          navigation: navigation,
          pageCount: book.volumeInfo.pageCount,
          publisher: book.volumeInfo.publisher,
          thumbnail: book.volumeInfo.imageLinks.thumbnail,
          title: book.volumeInfo.title,
        })),
        4: volumes.map(book => ({
          author: book.volumeInfo.authors.join(', '),
          description: book.volumeInfo.description,
          id: book.id,
          navigation: navigation,
          pageCount: book.volumeInfo.pageCount,
          publisher: book.volumeInfo.publisher,
          thumbnail: book.volumeInfo.imageLinks.thumbnail,
          title: book.volumeInfo.title,
        })),
      });
    }, [])
  );

  return (
    <ScrollView>
      <View style={{ backgroundColor: 'white' }}>
        {Object.keys(bookshelves).map(id => (
          <Shelf key={id} books={bookshelves[id]} title={titles[id]} />
        ))}
      </View>
    </ScrollView>
  );
};

export default BookshelvesScreen;
