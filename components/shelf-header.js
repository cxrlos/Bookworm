import React from 'react';
import { Text, View } from 'react-native';
import { material } from 'react-native-typography';

import { getShelfHeader } from '../utils';

/**
 * Represents the title of a shelf
 * @param {number} length - The number of books that are in the shelf
 * @param {string} title - The title of the shelf (Por leer, leyendo, etc.)
 */

const ShelfHeader = ({ length, title }) => (
  <View
    style={{
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    }}
  >
    <Text style={material.title}>{title}</Text>
    <Text style={material.subheading}>{getShelfHeader(length)}</Text>
  </View>
);

export default ShelfHeader;
