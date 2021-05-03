import React from 'react';
import { Text, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { material } from 'react-native-typography';

const LoadingScreen = ({ message }) => {
  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
      }}
    >
      <View>
        <ActivityIndicator
          animating={true}
          size="large"
          style={{ marginBottom: 16 }}
        />
        <Text style={material.caption}>{message}</Text>
      </View>
    </View>
  );
};

export default LoadingScreen;
