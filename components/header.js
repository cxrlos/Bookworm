import React from 'react';
import { Appbar } from 'react-native-paper';

export default () => (
  <Appbar.Header>
    <Appbar.BackAction />
    <Appbar.Content title="Bookworm" />
    <Appbar.Action icon="magnify" />
    <Appbar.Action icon="dots-vertical" />
  </Appbar.Header>
);
