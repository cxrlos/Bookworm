import React, { useLayoutEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { IconButton, TextInput } from 'react-native-paper';
import { material } from 'react-native-typography';
import { useDispatch, useSelector } from 'react-redux';

import BookCard from '../components/book-card';
import Time from '../components/time';
import {
  clearSessionDuration,
  readingSelector,
} from '../redux/slices/reading-slice';

import { updateReadingProgress } from '../redux/slices/library-slice';
import { bookSelector } from '../redux/slices/book-slice';

/**
 * Represents the progress screen of a book that is being read. It allows the user to update the reading progess after a reading session has ended.
 * @param {Object} navigation - To create the stack navigation
 * @param {Object} route - Object that contains the data passed in the navigation. In this case, it contains the book's identifier that is slected as well as the pageCount for it.
 */

const ProgressScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const selector = useSelector(bookSelector);
  const { sessionDuration } = useSelector(readingSelector);

  const { bookId, pageCount } = route.params;

  const textInputRef = useRef();

  const oldCurrentPage = selector.currentPage;

  const [currentPage, setCurrentPage] = useState(oldCurrentPage);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <IconButton
          icon="close"
          onPress={() => {
            dispatch(clearSessionDuration());
            navigation.replace('Libro', { ...route.params });
          }}
        />
      ),
      headerRight: () => (
        <IconButton
          icon="check"
          onPress={() => {
            dispatch(
              updateReadingProgress(
                bookId,
                currentPage,
                oldCurrentPage,
                sessionDuration
              )
            );
            dispatch(clearSessionDuration());
            navigation.replace('Libro', { ...route.params });
          }}
          disabled={pageCount && !currentPage}
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
            <Time time={sessionDuration} />
          </View>
          {pageCount && (
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
          )}
        </View>
      </View>
    </View>
  );
};

export default ProgressScreen;
