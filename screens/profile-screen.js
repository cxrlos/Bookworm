import React, { useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import { Button, Drawer } from 'react-native-paper';
import { material } from 'react-native-typography';
import { useDispatch, useSelector } from 'react-redux';

import Layout from '../components/layout';

import { PERSONAL_INFORMATION, PASSWORD, DAILY_GOAL } from '../constants';
import { fetchUserInfo, formSelector } from '../redux/slices/form-slice';

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const {
    loading,
    userInfo: { firstName, lastName, email, sex, password, dailyGoal },
  } = useSelector(formSelector);

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  const menu = {
    'Configuración de la cuenta': [
      {
        constants: PERSONAL_INFORMATION,
        icon: 'face-woman',
        label: 'Datos personales',
        fields: {
          firstName,
          lastName,
          email,
          sex,
        },
      },
      {
        constants: PASSWORD,
        icon: 'lock',
        label: 'Contraseña',
        fields: {
          password,
          passwordConfirmation: password,
        },
      },
    ],
    'Preferencias de lectura': [
      {
        constants: DAILY_GOAL,
        icon: 'flag',
        label: 'Objetivo diario',
        fields: {
          dailyGoal: dailyGoal && dailyGoal.toString(),
        },
      },
    ],
  };

  return (
    <Layout
      // isVerticallyCentered
      onRefresh={() => dispatch(fetchUserInfo())}
      refreshing={loading}
    >
      <View
        style={{
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
            <Text style={material.title}>
              {firstName} {lastName}
            </Text>
            <Text style={material.subheading}>{email}</Text>
          </View>
          <Text style={material.body2}>Objetivo diario</Text>
          <View style={{ alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ ...material.headline, marginRight: 6 }}>
              {dailyGoal}
            </Text>
            <Text style={material.caption}>páginas</Text>
          </View>
        </View>
        <View style={{ marginBottom: 16 }}>
          {Object.keys(menu).map(section => (
            <Drawer.Section key={section} title={section}>
              {menu[section].map(({ constants, icon, label, fields }) => (
                <Drawer.Item
                  icon={icon}
                  key={label}
                  label={label}
                  onPress={() =>
                    navigation.navigate('Formulario', {
                      constants,
                      fields,
                      name: label,
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
    </Layout>
  );
};

export default ProfileScreen;
