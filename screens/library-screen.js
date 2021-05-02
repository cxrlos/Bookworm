import { useFocusEffect } from '@react-navigation/core';
import React, { Fragment, useCallback, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Divider } from 'react-native-paper';
import Shelf from '../components/shelf';

import volumes from '../data/volumes';

const titles = {
  0: 'Favoritos',
  2: 'Por leer',
  3: 'Leyendo ahora',
  4: 'Leídos',
};

const LibraryScreen = ({ navigation }) => {
  const [bookshelves, setBookshelves] = useState({});

  useFocusEffect(
    useCallback(() => {
      setBookshelves({
        0: volumes.map(book => ({
          author: book.volumeInfo.authors,
          description: book.volumeInfo.description,
          id: book.id,
          navigation,
          pageCount: book.volumeInfo.pageCount,
          publisher: book.volumeInfo.publisher,
          shelf: '0',
          thumbnail: book.volumeInfo.imageLinks.thumbnail,
          title: book.volumeInfo.title,
        })),
        2: volumes.map(book => ({
          author: book.volumeInfo.authors,
          description: book.volumeInfo.description,
          id: book.id,
          navigation,
          pageCount: book.volumeInfo.pageCount,
          publisher: book.volumeInfo.publisher,
          shelf: '2',
          thumbnail: book.volumeInfo.imageLinks.thumbnail,
          title: book.volumeInfo.title,
        })),
        3: volumes.map(book => ({
          author: book.volumeInfo.authors,
          currentPage: book.currentPage,
          description: book.volumeInfo.description,
          id: book.id,
          navigation,
          pageCount: book.volumeInfo.pageCount,
          publisher: book.volumeInfo.publisher,
          shelf: '3',
          thumbnail: book.volumeInfo.imageLinks.thumbnail,
          title: book.volumeInfo.title,
        })),
        4: volumes.map(book => ({
          author: book.volumeInfo.authors,
          description: book.volumeInfo.description,
          id: book.id,
          navigation,
          pageCount: book.volumeInfo.pageCount,
          publisher: book.volumeInfo.publisher,
          shelf: '4',
          thumbnail: book.volumeInfo.imageLinks.thumbnail,
          title: book.volumeInfo.title,
        })),
      });
    }, [])
  );

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      {Object.keys(bookshelves).map(id => (
        <Fragment key={id}>
          <Shelf
            books={bookshelves[id]}
            navigation={navigation}
            shelf={id}
            title={titles[id]}
          />
          <Divider style={{ marginHorizontal: 16 }} />
        </Fragment>
      ))}
    </ScrollView>
  );
};

export default LibraryScreen;
