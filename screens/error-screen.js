import React from 'react';
import { Image, Text, View } from 'react-native';
import { material } from 'react-native-typography';
import Layout from '../components/layout';

/**
 * Represents the error screen when something goes wrong
 */

const ErrorScreen = () => {
  return (
    <Layout>
      <View style={{ padding: 16 }}>
        <View
          style={{
            alignItems: 'center',
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <Image
            resizeMode="center"
            source={require('../assets/undraw_page_not_found_su7k.png')}
            style={{ height: 192, width: '100%', marginBottom: 12 }}
          />
          <Text style={{ ...material.subheading, textAlign: 'center' }}>
            Oops, ocurrió un error. Por favor, vuelve a intentarlo.
          </Text>
        </View>
      </View>
    </Layout>
  );
};

export default ErrorScreen;
