import React, { useLayoutEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { IconButton, TextInput } from 'react-native-paper';
import { material } from 'react-native-typography';

import BookCard from '../components/book-card';
import Time from '../components/time';

const ProgressScreen = ({ route, navigation }) => {
  const { time, pageCount } = route.params;

  const textInputRef = useRef();
  const [text, setText] = useState('1');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <IconButton icon="close" onPress={handleUpdateProgress} />
      ),
      headerRight: () => (
        <IconButton icon="check" onPress={handleUpdateProgress} />
      ),
    });
  });

  const handleUpdateProgress = () => {
    navigation.navigate('Libro');
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        padding: 16,
      }}
    >
      <View>
        <View style={{ marginBottom: 34 }}>
          <BookCard item={route.params} />
        </View>
        <View style={{ alignItems: 'center' }}>
          <View
            style={{
              alignItems: 'center',
              marginBottom: 12,
              flexDirection: 'row',
            }}
          >
            <Text style={{ ...material.body1, marginRight: 8 }}>
              Tiempo leído:
            </Text>
            <Time time={time} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Text style={{ ...material.body1, marginRight: 8 }}>
              En la página
            </Text>

            <TextInput
              ref={textInputRef}
              mode="flat"
              dense={true}
              value={text}
              onChangeText={text => setText(text)}
              style={{
                ...material.headline,
                marginRight: 8,
                width: 64,
                textAlign: 'center',
              }}
            />
            <Text style={material.body1}>de {pageCount}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProgressScreen;
