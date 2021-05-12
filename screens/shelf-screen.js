import React from 'react';
import { ScrollView, View } from 'react-native';

import BookCard from '../components/book-card';

const ShelfScreen = ({ navigation, route }) => {
  const { books, shelfId } = route.params;

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View style={{ padding: 16 }}>
        {books.map(book => (
          <View key={book.id} style={{ marginVertical: 6 }}>
            <BookCard item={book} navigation={navigation} shelfId={shelfId} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default ShelfScreen;
