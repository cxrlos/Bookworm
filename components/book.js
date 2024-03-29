import * as React from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import { material } from 'react-native-typography';

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = SLIDER_WIDTH - 280;

/**
 * Represents a book in a shelf. It shows the title, book cover (thumbnail), and the authors of the book.
 * @param {Object} item - Contains the book's data, such as authors, page count, title...
 * @param {Object} navigation - To create the stack navigation
 */

const Book = ({ item, navigation }) => {
  const { authors, thumbnail, title } = item;

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Libro', { ...item })}>
      <View
        style={{
          flex: 1,
          height: 128,
          marginBottom: 6,
        }}
      >
        <Image
          source={{ uri: thumbnail }}
          style={{
            borderRadius: 2.5,
            flex: 1,
            resizeMode: 'contain',
          }}
        />
      </View>
      <View>
        <Text
          numberOfLines={1}
          style={{ ...material.body2, textAlign: 'center' }}
        >
          {title}
        </Text>
        <Text
          numberOfLines={1}
          style={{ ...material.body1, textAlign: 'center' }}
        >
          {authors && authors.join(', ')}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Book;
