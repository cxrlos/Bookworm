import React, { useEffect, useLayoutEffect } from 'react';
import { View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import { DAILY_GOAL, PASSWORD, PERSONAL_INFORMATION } from '../constants';
import Form from '../components/form';
import { formSelector } from '../redux/slices/form-slice';
import Layout from '../components/layout';
import { createUser } from '../redux/slices/user-slice';

/**
 * Represents the sign up screen
 * @param {Object} navigation - To create the stack navigation
 */

const SignUpScreen = ({ navigation }) => {
  const constants = { ...DAILY_GOAL, ...PASSWORD, ...PERSONAL_INFORMATION };

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    sex: '',
    password: '',
    passwordConfirmation: '',
    dailyGoal: '',
  };

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
          onPress={() => navigation.goBack(null)}
        />
      ),
    });
  });

  const { submitting } = useSelector(formSelector);

  const onSubmit = (values, actions) => dispatch(createUser(values, actions));

  return (
    <Layout isVerticallyCentered>
      <View style={{ padding: 16 }}>
        <Form
          constants={constants}
          initialValues={initialValues}
          label="Registrarse"
          onSubmit={onSubmit}
        />
      </View>
    </Layout>
  );
};

export default SignUpScreen;
