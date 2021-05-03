import { useFocusEffect } from '@react-navigation/core';
import React, { useCallback, useState } from 'react';
import { ScrollView, View } from 'react-native';

import BookCard from '../components/book-card';

const ShelfScreen = ({ navigation, route }) => {
  const { shelf } = route.params;

  const [books, setBooks] = useState([]);

  return (
    <ScrollView>
      <View style={{ padding: 16 }}>
        {/* {books.map(book => (
          <View key={book.id} style={{ marginVertical: 6 }}>
            <BookCard item={book} navigation={navigation} shelf={shelf} />
          </View>
        ))} */}
      </View>
    </ScrollView>
  );
};

export default ShelfScreen;
