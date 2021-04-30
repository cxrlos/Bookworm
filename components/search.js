import React from 'react';
import { TextInput } from 'react-native-paper';

const Search = () => {
  return (
    <TextInput dense={true} placeholder="Buscar libros" autoFocus={true} />
  );
};

export default Search;
