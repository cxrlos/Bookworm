import { observer } from 'mobx-react-lite';
import React, { Fragment, useContext, useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Divider } from 'react-native-paper';

import Shelf from '../components/shelf';
import BookStore from '../stores/book-store';

import { LIBRARY } from '../constants';

const LibraryScreen = ({ navigation }) => {
  const bookStore = useContext(BookStore);

  useEffect(() => {
    bookStore.getLibrary();
  }, []);

  if (bookStore.loading) {
    return (
      <View style={{ flex: 1 }}>
        <Text>Loading</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      {Object.keys(bookStore.library).map(shelf => (
        <Fragment key={shelf}>
          <Shelf
            books={bookStore.library[shelf]}
            navigation={navigation}
            shelf={shelf}
            title={LIBRARY[shelf]}
          />
          <Divider style={{ marginHorizontal: 16 }} />
        </Fragment>
      ))}
    </ScrollView>
  );
};

export default observer(LibraryScreen);
