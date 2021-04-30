import React, { useLayoutEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { IconButton, TextInput } from 'react-native-paper';
import { material } from 'react-native-typography';

import BookCard from '../components/book-card';
import Progress from '../components/progress';
import Time from '../components/time';

const ProgressScreen = ({ route, navigation }) => {
  const { currentPage: propCurrentPage, pageCount, time } = route.params;

  const textInputRef = useRef();
  const [currentPage, setCurrentPage] = useState(propCurrentPage || '0');

  const [dialog, setDialog] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <IconButton icon="close" onPress={handleUpdateProgress} />
      ),
      headerRight: () => (
        <IconButton
          icon="check"
          onPress={handleUpdateProgress}
          disabled={!currentPage}
        />
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
          <BookCard disabled currentPage={currentPage} item={route.params} />
        </View>
        <View style={{ alignItems: 'center' }}>
          <View
            style={{
              alignItems: 'center',
              marginBottom: 12,
              flexDirection: 'row',
            }}
          >
            <Text style={{ ...material.subheading, marginRight: 8 }}>
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
            <Text style={{ ...material.subheading, marginRight: 8 }}>
              En la página
            </Text>
            <TextInput
              dense
              keyboardType="numeric"
              mode="flat"
              onChangeText={currentPage =>
                currentPage <= pageCount &&
                setCurrentPage(currentPage.replace(/^0+/, ''))
              }
              ref={textInputRef}
              style={{
                ...material.headline,
                marginRight: 8,
                width: 64,
                textAlign: 'center',
              }}
              value={currentPage.toString()}
            />
            <Text style={material.subheading}>de {pageCount}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProgressScreen;
