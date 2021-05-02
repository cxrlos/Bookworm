import React from 'react';
import { Image, Text, View } from 'react-native';
import { Button, Drawer } from 'react-native-paper';
import { material } from 'react-native-typography';

import { PERSONAL_INFORMATION, PASSWORD, DAILY_GOAL } from '../constants';

const ProfileScreen = ({ navigation }) => {
  const menu = {
    'Configuración de la cuenta': [
      {
        constants: PERSONAL_INFORMATION,
        icon: 'face-woman',
        label: 'Datos personales',
        fields: {
          firstName: 'Daniela',
          lastName: 'Vignau',
          email: 'daniela@vignau.com',
          sex: 'F',
        },
      },
      {
        constants: PASSWORD,
        icon: 'lock',
        label: 'Contraseña',
        fields: {
          password: 'password',
          passwordConfirmation: 'password',
        },
      },
    ],
    'Preferencias de lectura': [
      {
        constants: DAILY_GOAL,
        icon: 'flag',
        label: 'Objetivo diario',
        fields: {
          dailyGoal: '10',
        },
      },
    ],
  };

  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'space-around',
        padding: 16,
      }}
    >
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 16,
        }}
      >
        <Image
          source={require('../assets/profile.png')}
          style={{
            borderRadius: 92 / 2,
            height: 92,
            marginBottom: 16,
            width: 92,
          }}
        />
        <View style={{ marginBottom: 12, alignItems: 'center' }}>
          <Text style={material.title}>Daniela Vignau</Text>
          <Text style={material.subheading}>daniela@vignau.com.mx</Text>
        </View>
        <Text style={material.body2}>Objetivo diario:</Text>
        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
          <Text style={{ ...material.headline, marginRight: 6 }}>10</Text>
          <Text style={material.caption}>páginas</Text>
        </View>
      </View>
      <View style={{ marginBottom: 16 }}>
        {Object.keys(menu).map(section => (
          <Drawer.Section key={section} title={section}>
            {menu[section].map(item => (
              <Drawer.Item
                key={item.label}
                icon={item.icon}
                label={item.label}
                onPress={() =>
                  navigation.navigate('Formulario', {
                    name: item.label,
                    constants: item.constants,
                    fields: item.fields,
                  })
                }
              />
            ))}
          </Drawer.Section>
        ))}
      </View>
      <View style={{ alignItems: 'center' }}>
        <Button onPress={() => {}}>Cerrar sesión</Button>
      </View>
    </View>
  );
};

export default ProfileScreen;
