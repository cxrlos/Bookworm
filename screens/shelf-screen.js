import React, { useLayoutEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { IconButton, withTheme } from 'react-native-paper';

import BookCard from '../components/book-card';

/**
 * Represents the screen containing the shelves of a user
 * @param {Object} navigation - To create the stack navigation
 * @param {------} route -
 * @param {------} colors -
 */

const ShelfScreen = ({ navigation, route, theme: { colors } }) => {
  const { books, shelfId } = route.params;

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
    <ScrollView style={{ backgroundColor: colors.background }}>
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

export default withTheme(ShelfScreen);
