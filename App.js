import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native';
import {
  Title,
  Subheading,
  Headline,
  Provider as PaperProvider,
  DefaultTheme,
} from 'react-native-paper';

import BottomNavigationMenu from './components/bottom-navigation';
import BookCard from './components/book-card';
import Header from './components/header';
import SearchBar from './components/search-bar';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#fff',
  },
};

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <Header />
      {/* <SearchBar /> */}
      <ScrollView contentContainerStyle={{ paddingHorizontal: 24 }}>
        <Headline>Bookworm</Headline>
        <Title>¡Hola, Andrea!</Title>
        <Subheading>
          Te faltan 20 páginas para tu meta de 40 páginas diarias
        </Subheading>
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
      </ScrollView>
      <BottomNavigationMenu />
      <StatusBar style="auto" />
    </PaperProvider>
  );
};

export default App;
