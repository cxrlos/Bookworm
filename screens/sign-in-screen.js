import { Formik } from 'formik';
import React, { Fragment, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { Button, TextInput, withTheme } from 'react-native-paper';
import { material } from 'react-native-typography';

import { PASSWORD, PERSONAL_INFORMATION } from '../constants';
import firebase from '../firebase/firebase';
import Layout from '../components/layout';
import { isPassword } from '../utils';

const SignInScreen = ({ navigation, theme: { colors } }) => {
  const constants = { ...PASSWORD, ...PERSONAL_INFORMATION };
  const fields = { email: '', password: '' };

  const [showing, setShowing] = useState(false);

  const handleShowPassword = field => {
    if (isPassword(field)) {
      if (showing) {
        return (
          <TextInput.Icon name="eye-off" onPress={() => setShowing(!showing)} />
        );
      }
      return <TextInput.Icon name="eye" onPress={() => setShowing(!showing)} />;
    }
    return undefined;
  };

  const onSubmit = ({ email, password }) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.warn(res);
        console.warn('User logged-in successfully!');
        navigation.navigate('App');
      })
      .catch(error => {
        Alert.alert(error.message);
        this.setState({ errorMessage: error.message });
        this.setState({
          isLoading: false,
        });
        navigation.navigate('App');
      });
  };

  return (
    <Layout isVerticallyCentered>
      <View style={{ padding: 16 }}>
        <Formik initialValues={fields} onSubmit={values => onSubmit(values)}>
          {({ errors, handleChange, handleBlur, handleSubmit, values }) => (
            <>
              {Object.keys(values).map(field => (
                <Fragment key={field}>
                  <TextInput
                    defaultValue={values[field]}
                    dense
                    error={errors[field]}
                    label={constants[field]}
                    mode="outlined"
                    onBlur={handleBlur(field)}
                    onChangeText={handleChange(field)}
                    right={handleShowPassword(field)}
                    secureTextEntry={isPassword(field) && !showing}
                  />
                  <Text style={{ ...material.caption }}></Text>
                </Fragment>
              ))}
              <Text style={{ ...material.caption }}></Text>
              <Text
                style={{
                  ...material.caption,
                  color: colors.primary,
                  marginBottom: 34,
                }}
              >
                ¿Olvidaste tu contraseña?
              </Text>
              <Button dark mode="contained" onPress={handleSubmit}>
                Iniciar sesión
              </Button>
            </>
          )}
        </Formik>
      </View>
    </Layout>
  );
};

export default withTheme(SignInScreen);
