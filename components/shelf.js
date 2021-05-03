import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Divider, TouchableRipple } from 'react-native-paper';
import { material } from 'react-native-typography';

import Book, { ITEM_WIDTH } from '../components/book';

const Shelf = ({ books, navigation, shelf, title }) => {
  return (
    <TouchableRipple
      onPress={() => navigation.navigate('Estantería', { name: title, shelf })}
    >
      <View style={{ marginTop: 16 }}>
        <View
          style={{
            flex: 1,
            marginHorizontal: 16,
          }}
        >
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text style={material.title}>{title}</Text>
            <Text style={material.subheading}>
              {books.length}{' '}
              {`libro${books.length > 1 || books.length === 0 ? 's' : ''}`}
            </Text>
          </View>
        </View>
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 16,
            paddingTop: 12,
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
              <Book item={book} navigation={navigation} />
            </View>
          ))}
        </ScrollView>
      </View>
    </TouchableRipple>
  );
};

export default Shelf;
