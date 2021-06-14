import React from 'react';
import { Appbar } from 'react-native-paper';

/**
 * Represents the Header that is shown in all screens
 */

export default () => (
  <Appbar.Header>
    <Appbar.BackAction />
    <Appbar.Content title="Bookworm" />
    <Appbar.Action icon="magnify" />
    <Appbar.Action icon="dots-vertical" />
  </Appbar.Header>
);
