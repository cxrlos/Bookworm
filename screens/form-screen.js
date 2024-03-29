import React, { useEffect, useLayoutEffect } from 'react';
import { View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import Form from '../components/form';
import { formSelector } from '../redux/slices/form-slice';
import Layout from '../components/layout';
import { updateUser } from '../redux/slices/user-slice';

/**
 * Represents the form screen
 * @param {Object} navigation - To create the stack navigation
 * @param {Object} route - Object that contains the data passed in the navigation. In this case it contains the constants and fields that should be updated in the form.
 */

const FormScreen = ({ navigation, route }) => {
  const { constants, fields } = route.params;

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

  const onSubmit = values => dispatch(updateUser(values));

  return (
    <Layout isVerticallyCentered>
      <View style={{ padding: 16 }}>
        <Form
          constants={constants}
          initialValues={fields}
          label="Guardar"
          onSubmit={onSubmit}
        />
      </View>
    </Layout>
  );
};

export default FormScreen;
