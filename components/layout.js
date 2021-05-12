import React from 'react';
import { RefreshControl, ScrollView } from 'react-native';

const Layout = ({ children, isVerticallyCentered, onRefresh, refreshing }) => (
  <ScrollView
    contentContainerStyle={{
      ...(isVerticallyCentered && { flex: 1, justifyContent: 'center' }),
    }}
    style={{ backgroundColor: 'white' }}
    refreshControl={
      <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
    }
  >
    {!refreshing && children}
  </ScrollView>
);

export default Layout;
