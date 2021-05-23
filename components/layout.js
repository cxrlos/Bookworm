import React from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { withTheme } from 'react-native-paper';

const Layout = ({
  children,
  isVerticallyCentered,
  onRefresh,
  refreshing,
  style,
  theme: { colors },
}) => (
  <ScrollView
    contentContainerStyle={{
      ...(isVerticallyCentered && { flex: 1, justifyContent: 'center' }),
    }}
    style={{ backgroundColor: colors.background, ...style }}
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

export default withTheme(Layout);
