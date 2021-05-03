import * as React from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import { material } from 'react-native-typography';

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = SLIDER_WIDTH - 280;

const Book = ({ item, navigation }) => {
  const {
    authors,
    currentPage,
    description,
    id,
    pageCount,
    publisher,
    shelf,
    thumbnail,
    title,
  } = item;

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Libro', {
          authors,
          currentPage,
          description,
          id,
          pageCount,
          publisher,
          shelf,
          thumbnail,
          title,
        })
      }
    >
      <View
        style={{
          flex: 1,
          height: 128,
          marginBottom: 6,
          // backgroundColor: 'red',
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
        <Text style={{ ...material.body2, textAlign: 'center' }}>{title}</Text>
        <Text
          numberOfLines={1}
          style={{ ...material.body1, textAlign: 'center' }}
        >
          {authors.join(', ')}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Book;
