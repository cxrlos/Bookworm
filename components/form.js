import { Formik } from 'formik';
import React, { Fragment } from 'react';
import { Text, View } from 'react-native';
import { Button, TextInput, withTheme } from 'react-native-paper';
import { material } from 'react-native-typography';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import {
  formSelector,
  hidePassword,
  showPassword,
} from '../redux/slices/form-slice';
import { isPassword } from '../utils';
import validationRules from '../validation-rules';

/**
 * Represents the form where the user fills in the data.
 * @param {Object} constants - The field's title
 * @param {Object} initialValues - The forms initial values as they are prefilled after registration
 * @param {String} label - The message shown to the user when the form is not loading
 * @param {function} onSubmit - Function that saves the values of the form upon submit
 */

const Form = ({
  constants,
  initialValues,
  label,
  onSubmit,
  theme: { colors },
}) => {
  const dispatch = useDispatch();

  const { isPasswordVisible, submitting } = useSelector(formSelector);

  const validationSchema = Yup.object().shape(
    Object.keys(initialValues)
      .filter(key => Object.keys(validationRules).includes(key))
      .reduce((obj, key) => {
        obj[key] = validationRules[key];
        return obj;
      }, {})
  );

  const handleShowPassword = field => {
    if (isPassword(field)) {
      return (
        <TextInput.Icon
          disabled={submitting}
          name={`eye${isPasswordVisible ? '-off' : ''}`}
          onPress={() =>
            isPasswordVisible
              ? dispatch(hidePassword())
              : dispatch(showPassword())
          }
        />
      );
    }
    return undefined;
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => onSubmit(values, actions)}
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
                    dense
                    disabled={submitting}
                    error={errors[field]}
                    label={constants[field]}
                    mode="outlined"
                    onBlur={handleBlur(field)}
                    onChangeText={handleChange(field)}
                    right={handleShowPassword(field)}
                    secureTextEntry={isPassword(field) && !isPasswordVisible}
                    value={values[field] || ''}
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
              {submitting ? 'Cargando' : label}
            </Button>
          </>
        )}
      </Formik>
    </>
  );
};

export default withTheme(Form);
