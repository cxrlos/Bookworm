import { Formik } from 'formik';
import React, { Fragment, useEffect, useLayoutEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Button, IconButton, TextInput, withTheme } from 'react-native-paper';
import { material } from 'react-native-typography';
import * as Yup from 'yup';

import { DAILY_GOAL, PASSWORD, PERSONAL_INFORMATION } from '../constants';
import firebase from '../firebase/firebase';
import Layout from '../components/layout';
import { isPassword } from '../utils';
import validationRules from '../validation-rules';

const SignUpScreen = ({ navigation, theme: { colors } }) => {
  const constants = { ...DAILY_GOAL, ...PASSWORD, ...PERSONAL_INFORMATION };

  const fields = {
    firstName: '',
    lastName: '',
    email: '',
    sex: '',
    password: '',
    passwordConfirmation: '',
    dailyGoal: '',
  };

  const validationSchema = Yup.object().shape(validationRules);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [submitting, setSubmitting] = useState(false);

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

  const handleShowPassword = field => {
    if (isPassword(field)) {
      return (
        <TextInput.Icon
          name={`eye${isPasswordVisible ? '-off' : ''}`}
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        />
      );
    }
    return undefined;
  };

  const onSubmit = values => {
    setSubmitting(true);
    firebase
      .auth()
      .createUserWithEmailAndPassword(values.email, values.password)
      .then(res => {
        res.user
          .updateProfile({
            displayName: values.name,
          })
          .then(() => {
            setSubmitting(false);
          });
      })
      .catch(error => {
        setSubmitting(false);
        console.warn(error);
      });
  };

  return (
    <Layout isVerticallyCentered>
      <View style={{ padding: 16 }}>
        <Formik
          initialValues={fields}
          onSubmit={values => onSubmit(values)}
          validateOnBlur={false}
          validateOnChange={false}
          validationSchema={validationSchema}
        >
          {({ errors, handleChange, handleBlur, handleSubmit, values }) => (
            <>
              <View style={{ marginBottom: 34 }}>
                {Object.keys(values).map(field => (
                  <Fragment key={field}>
                    <TextInput
                      defaultValue={values[field]}
                      disabled={submitting}
                      dense
                      error={errors[field]}
                      label={constants[field]}
                      mode="outlined"
                      onBlur={handleBlur(field)}
                      onChangeText={handleChange(field)}
                      right={handleShowPassword(field)}
                      secureTextEntry={isPassword(field) && !isPasswordVisible}
                    />

                    <Text
                      style={{
                        ...material.caption,
                        color: colors.error,
                      }}
                    >
                      {errors[field] ? errors[field] : ''}
                    </Text>
                  </Fragment>
                ))}
              </View>
              <Button
                dark
                disabled={submitting}
                loading={submitting}
                mode="contained"
                onPress={handleSubmit}
              >
                {submitting ? 'Cargando' : 'Registrarse'}
              </Button>
            </>
          )}
        </Formik>
      </View>
    </Layout>
  );
};

export default withTheme(SignUpScreen);
