import React from 'react';
import { Image, Text, View } from 'react-native';
import { Button, withTheme } from 'react-native-paper';
import { material } from 'react-native-typography';

const StartScreen = ({ navigation, theme: { colors } }) => {
  return (
    <View
      style={{
        backgroundColor: colors.background,
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 24,
      }}
    >
      <View
        style={{
          flex: 3,
          justifyContent: 'center',
        }}
      >
        <Image
          resizeMode="center"
          source={require('../assets/undraw_reading_time_gvg0.png')}
          style={{
            height: 192,
            marginBottom: 16,
            width: '100%',
          }}
        />
        <Text
          style={{
            ...material.display1,
            textAlign: 'center',
          }}
        >
          Bookworm
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
        }}
      >
        <View style={{ marginBottom: 34 }}>
          <Text
            style={{
              ...material.title,
              marginBottom: 12,
              textAlign: 'center',
            }}
          >
            Bienvenid@ a Bookworm
          </Text>
          <Text
            style={{
              ...material.caption,
              textAlign: 'center',
            }}
          >
            Proin aliquam blandit nibh, sed bibendum risus vulputate vel. Nullam
            aliquet rhoncus justo, nec consectetur elit.
          </Text>
        </View>
        <Button
          dark
          mode="contained"
          onPress={() => navigation.navigate('Registro')}
          style={{ marginBottom: 12 }}
        >
          Registrarse
        </Button>
        <Button
          color={colors.greyLight}
          dark
          mode="contained"
          onPress={() => navigation.navigate('Inicio de sesión')}
        >
          Iniciar sesión
        </Button>
      </View>
    </View>
  );
};

export default withTheme(StartScreen);
