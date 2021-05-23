import { Formik } from 'formik';
import React, { Fragment, useEffect, useLayoutEffect } from 'react';
import { Text, View } from 'react-native';
import { Button, IconButton, Snackbar, TextInput } from 'react-native-paper';
import { material } from 'react-native-typography';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import { FORM_ACTIONS } from '../constants';
import {
  closeSnackBar,
  enterEditMode,
  formSelector,
  updateUserInfo,
} from '../redux/slices/form-slice';
import Layout from '../components/layout';

const FormScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const { editing, isSnackBarVisible, saving, snackBarMessage } =
    useSelector(formSelector);

  const { constants, fields } = route.params;

  useEffect(() =>
    navigation.addListener('beforeRemove', e => {
      if (!editing) return;
      e.preventDefault();
    })
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      gesturesEnabled: editing,
      headerLeft: () => (
        <IconButton
          disabled={editing}
          icon="arrow-left"
          onPress={() => navigation.goBack()}
        />
      ),
    });
  });

  const handleEdit = () => {
    dispatch(enterEditMode());
  };

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

  const hasErrors = errors => {
    for (let key in errors) {
      if (errors.hasOwnProperty(key)) {
        return true;
      }
    }
    return false;
  };

  const onSubmit = values => {
    dispatch(updateUserInfo(values));
  };

  const validation = {
    firstName: Yup.string().required('Obligatorio'),
    lastName: Yup.string().required('Obligatorio'),
    email: Yup.string()
      .email('Correo electrónico inválido')
      .required('Obligatorio'),
    password: Yup.string()
      .required('No password provided.')
      .min(8, 'Password is too short - should be 8 chars minimum.')
      .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
    passwordConfirmation: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Passwords must match'
    ),
    dailyGoal: Yup.number().required('Obligatorio'),
  };

  const validationSchema = Yup.object().shape(
    Object.keys(validation)
      .filter(key => Object.keys(fields).includes(key))
      .reduce((obj, key) => {
        obj[key] = validation[key];
        return obj;
      }, {})
  );

  return (
    <>
      <Layout isVerticallyCentered>
        <View
          style={{
            padding: 16,
          }}
        >
          <Formik
            initialValues={fields}
            onSubmit={values => {
              onSubmit(values);
            }}
            validationSchema={validationSchema}
          >
            {({ errors, handleChange, handleBlur, handleSubmit, values }) => (
              <>
                <View style={{ marginBottom: 4 }}>
                  {Object.keys(values).map(field => (
                    <Fragment key={field}>
                      <TextInput
                        defaultValue={values[field]}
                        dense
                        disabled={!editing}
                        error={errors[field]}
                        label={constants[field]}
                        mode="outlined"
                        onBlur={handleBlur(field)}
                        onChangeText={handleChange(field)}
                        secureTextEntry={
                          field === 'password' ||
                          field === 'passwordConfirmation'
                        }
                      />
                      <View style={{ alignSelf: 'flex-end' }}>
                        {errors[field] ? (
                          <Text
                            style={{
                              ...material.caption,
                              color: '#F50057',
                            }}
                          >
                            {errors[field]}
                          </Text>
                        ) : (
                          <Text
                            style={{
                              ...material.caption,
                            }}
                          ></Text>
                        )}
                      </View>
                    </Fragment>
                  ))}
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Button
                    disabled={saving || hasErrors(errors)}
                    onPress={editing ? handleSubmit : handleEdit}
                    style={{ marginTop: 34 }}
                  >
                    {editing ? 'Guardar' : 'Editar'}
                  </Button>
                </View>
              </>
            )}
          </Formik>
        </View>
      </Layout>
      <Snackbar
        visible={isSnackBarVisible}
        onDismiss={() => dispatch(closeSnackBar())}
        action={{
          label: 'Cerrar',
          onPress: () => dispatch(closeSnackBar()),
        }}
      >
        {FORM_ACTIONS[snackBarMessage]}
      </Snackbar>
    </>
  );
};

export default FormScreen;
