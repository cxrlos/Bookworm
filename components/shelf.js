import React from 'react';
import { ScrollView, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';

import Book, { ITEM_WIDTH } from '../components/book';
import { LIBRARY } from '../constants';
import ShelfHeader from './shelf-header';

/**
 * Represents a shelf
 * @param {Array} books - The books that are in the shelf
 * @param {Object} navigation - To create the stack navigation
 * @param {string} shelfId - The shelf the book to open corresponds to
 */

const Shelf = ({ books, navigation, shelfId }) => {
  const name = LIBRARY[shelfId];

  return (
    <TouchableRipple
      onPress={() => navigation.navigate('Estantería', { books, shelfId })}
    >
      <View style={{ marginTop: 16 }}>
        <View style={{ marginBottom: 12, marginHorizontal: 16 }}>
          <ShelfHeader length={books.length} title={name} />
        </View>
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 16,
            paddingHorizontal: 10,
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {books.map(book => (
            <View
              key={book.bookId}
              style={{
                marginHorizontal: 6,
                width: ITEM_WIDTH,
              }}
            >
              <Book item={book} navigation={navigation} shelfId={shelfId} />
            </View>
          ))}
        </ScrollView>
      </View>
    </TouchableRipple>
  );
};

export default Shelf;
