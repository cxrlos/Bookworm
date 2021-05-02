import { useFocusEffect } from "@react-navigation/core";
import { observer } from "mobx-react-lite";
import React, { Fragment, useCallback, useContext } from "react";
import { ScrollView, View } from "react-native";
import { Divider } from "react-native-paper";

import Shelf from "../components/shelf";
import BookStore from "../stores/book-store";

import { LIBRARY } from "../constants";

const LibraryScreen = ({ navigation }) => {
  const bookStore = useContext(BookStore);

  useFocusEffect(
    useCallback(() => {
      bookStore.getLibrary();
    }, [bookStore])
  );

  const { library } = bookStore;

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      {Object.keys(library).map((shelf) => (
        <Fragment key={shelf}>
          <Shelf
            books={library[shelf]}
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
