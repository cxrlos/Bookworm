import * as React from 'react';
import { Appbar } from 'react-native-paper';

const NavigationBar = ({ navigation, previous }) => {
  return (
    <Appbar.Header>
      {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title="My awesome app" />
    </Appbar.Header>
  );
};

export default NavigationBar;
