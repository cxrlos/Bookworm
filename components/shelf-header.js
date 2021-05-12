import React from 'react';
import { Text, View } from 'react-native';
import { material } from 'react-native-typography';

import { getShelfHeader } from '../utils';

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
