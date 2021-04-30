import * as React from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import { material } from 'react-native-typography';

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = SLIDER_WIDTH - 280;

const Book = ({ item }) => {
  const {
    author,
    currentPage,
    description,
    id,
    navigation,
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
          author,
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
        <Text style={{ ...material.body1, textAlign: 'center' }}>{author}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Book;
