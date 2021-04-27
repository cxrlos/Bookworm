import * as React from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import { material } from 'react-native-typography';

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = SLIDER_WIDTH - 280;

const Book = ({ item }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        item.navigation.navigate('Libro', {
          author: item.author,
          description: item.description,
          id: item.id,
          pageCount: item.pageCount,
          publisher: item.publisher,
          thumbnail: item.thumbnail,
          title: item.title,
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
          source={{ uri: item.thumbnail }}
          style={{
            borderRadius: 2.5,
            flex: 1,
            resizeMode: 'contain',
          }}
        />
      </View>
      <View>
        <Text style={{ ...material.body2, textAlign: 'center' }}>
          {item.title}
        </Text>
        <Text style={{ ...material.body1, textAlign: 'center' }}>
          {item.author}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Book;
