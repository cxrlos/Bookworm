import React from 'react';
import { RefreshControl, ScrollView } from 'react-native';

const Layout = ({ children, isVerticallyCentered, onRefresh, refreshing }) => (
  <ScrollView
    contentContainerStyle={{
      ...(isVerticallyCentered && { flex: 1, justifyContent: 'center' }),
    }}
    style={{ backgroundColor: 'white' }}
    refreshControl={
      onRefresh ? (
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      ) : undefined
    }
  >
    {!refreshing && children}
    {/* <Dialog /> */}
  </ScrollView>
);

export default Layout;
