import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { material } from 'react-native-typography';

import Book, { ITEM_WIDTH } from '../components/book';
import { LIBRARY } from '../constants';
import ShelfHeader from './shelf-header';

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
              key={book.id}
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
