import React from 'react';
import { View } from 'react-native';

const Layout = ({ children }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    {children}
  </View>
);

export default Layout;
