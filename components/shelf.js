import { observer } from 'mobx-react-lite';
import React, { useRef } from 'react';
import { Text, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import { material } from 'react-native-typography';

import Book, { SLIDER_WIDTH, ITEM_WIDTH } from '../components/book';

const Shelf = ({ books, navigation, shelf, title }) => {
  const isCarousel = useRef(null);

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
              {books.length} {`libro${books.length > 1 ? 's' : ''}`}
            </Text>
          </View>
        </View>
        <Carousel
          activeSlideAlignment="start"
          contentContainerCustomStyle={{
            marginHorizontal: 16,
            paddingBottom: 16,
            paddingTop: 12,
          }}
          data={books}
          enableMomentum={true}
          itemWidth={ITEM_WIDTH}
          ref={isCarousel}
          renderItem={Book}
          sliderWidth={SLIDER_WIDTH}
        />
      </View>
    </TouchableRipple>
  );
};

export default observer(Shelf);
