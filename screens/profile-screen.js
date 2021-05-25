import React, { useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import { Button, Drawer } from 'react-native-paper';
import { material } from 'react-native-typography';
import { useDispatch, useSelector } from 'react-redux';

import Layout from '../components/layout';

import { PERSONAL_INFORMATION, PASSWORD, DAILY_GOAL } from '../constants';
import { fetchUser, userSelector } from '../redux/slices/user-slice';

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const {
    loading,
    user: { firstName, lastName, email, sex, password, dailyGoal },
  } = useSelector(userSelector);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const menu = {
    'Configuración de la cuenta': [
      {
        constants: PERSONAL_INFORMATION,
        icon: 'information',
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
    <Layout onRefresh={() => dispatch(fetchUser())} refreshing={loading}>
      <View style={{ padding: 16 }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 16,
          }}
        >
          <Image
            source={
              sex === 'F'
                ? require('../assets/undraw_female_avatar_w3jk.png')
                : require('../assets/undraw_male_avatar_323b.png')
            }
            style={{ height: 128, width: 128 }}
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
