import React, { useLayoutEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { IconButton, TextInput } from 'react-native-paper';
import { material } from 'react-native-typography';
import { useDispatch, useSelector } from 'react-redux';

import BookCard from '../components/book-card';
import Time from '../components/time';
import {
  readingSelector,
  resetTime,
  setUpdatingProgress,
} from '../redux/slices/reading-slice';

import { updateReadingProgress } from '../redux/slices/library-slice';
import { bookSelector } from '../redux/slices/book-slice';

const ProgressScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const selector = useSelector(bookSelector);
  const { time } = useSelector(readingSelector);

  const { pageCount } = route.params;

  const textInputRef = useRef();
  const [currentPage, setCurrentPage] = useState(selector.currentPage);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <IconButton
          icon="close"
          onPress={() => {
            dispatch(resetTime());
            dispatch(setUpdatingProgress(false));
            navigation.navigate('Libro', { ...route.params });
          }}
        />
      ),
      headerRight: () => (
        <IconButton
          icon="check"
          onPress={() => {
            dispatch(resetTime());
            dispatch(setUpdatingProgress(false));
            dispatch(updateReadingProgress(route.params, currentPage, time));
            navigation.navigate('Libro', { ...route.params });
          }}
          disabled={!currentPage}
        />
      ),
    });
  });

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
