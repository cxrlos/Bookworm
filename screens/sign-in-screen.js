import React, { useEffect, useLayoutEffect } from 'react';
import { Text, View } from 'react-native';
import { IconButton, withTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import { PASSWORD, PERSONAL_INFORMATION } from '../constants';
import Form from '../components/form';
import { formSelector } from '../redux/slices/form-slice';
import Layout from '../components/layout';
import { material } from 'react-native-typography';
import { signIn } from '../redux/slices/user-slice';

/**
 * Represents the sign in screen to the application
 * @param {Object} navigation - To create the stack navigation
 */

const SignInScreen = ({ navigation, theme: { colors } }) => {
  const constants = { ...PASSWORD, ...PERSONAL_INFORMATION };

  const initialValues = { email: '', password: '' };

  const dispatch = useDispatch();

  useEffect(() =>
    navigation.addListener('beforeRemove', e => {
      if (!submitting) return;
      e.preventDefault();
    })
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      gesturesEnabled: submitting,
      headerLeft: () => (
        <IconButton
          disabled={submitting}
          icon="arrow-left"
          onPress={() => navigation.goBack()}
        />
      ),
    });
  });

  const { submitting } = useSelector(formSelector);

  const onSubmit = (values, actions) =>
    dispatch(signIn(values, actions, navigation));

  return (
    <Layout isVerticallyCentered>
      <View style={{ padding: 16 }}>
        <Form
          constants={constants}
          initialValues={initialValues}
          label="Iniciar sesión"
          onSubmit={onSubmit}
        />
        <Text
          style={{
            ...material.caption,
            color: submitting ? colors.greyLight : colors.primary,
            marginTop: 24,
            textAlign: 'center',
          }}
        >
          ¿Olvidaste tu contraseña?
        </Text>
      </View>
    </Layout>
  );
};

export default withTheme(SignInScreen);
