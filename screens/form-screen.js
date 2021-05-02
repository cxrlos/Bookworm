import { Formik } from 'formik';
import React, { useLayoutEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, IconButton, Snackbar, TextInput } from 'react-native-paper';

const FormScreen = ({ navigation, route }) => {
  const { constants, fields } = route.params;

  const [disabled, setDisabled] = useState(true);
  const [edit, setEdit] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      gesturesEnabled: edit,
      headerLeft: () => (
        <IconButton
          disabled={edit}
          icon="arrow-left"
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
    });
  });

  const [visible, setVisible] = useState(false);

  const onDismissSnackBar = () => setVisible(false);

  const handleEdit = () => {
    setEdit(true);
  };

  const onSubmit = values => {
    console.warn(values);
    setEdit(false);
    setVisible(true);
  };

  return (
    <>
      <ScrollView
        style={{
          backgroundColor: 'white',
          padding: 16,
        }}
        contentContainerStyle={{ flex: 1, justifyContent: 'center' }}
      >
        <Formik
          initialValues={fields}
          onSubmit={values => {
            onSubmit(values);
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View>
              <View style={{ marginBottom: 4 }}>
                {Object.keys(values).map(field => (
                  <TextInput
                    disabled={!edit}
                    key={field}
                    label={constants[field]}
                    mode="outlined"
                    onBlur={handleBlur(field)}
                    onChangeText={handleChange(field)}
                    secureTextEntry={values[field] === 'password'}
                    style={{ marginBottom: 12 }}
                    defaultValue={values[field]}
                  />
                ))}
              </View>
              <View style={{ alignItems: 'center' }}>
                <Button onPress={edit ? handleSubmit : handleEdit}>
                  {edit ? 'Guardar' : 'Editar'}
                </Button>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Cerrar',
          onPress: () => {
            setVisible(false);
          },
        }}
      >
        Guardado exitosamente.
      </Snackbar>
    </>
  );
};

export default FormScreen;
