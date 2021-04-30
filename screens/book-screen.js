import React, { useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import {
  Button,
  Dialog,
  Divider,
  Portal,
  RadioButton,
  Snackbar,
} from 'react-native-paper';
import HTML from 'react-native-render-html';
import { material } from 'react-native-typography';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Progress from '../components/progress';

const BookScreen = ({ navigation, route }) => {
  const {
    author,
    currentPage,
    description,
    pageCount,
    publisher,
    shelf: shelfId,
    thumbnail,
    title,
  } = route.params;

  const [shelf, setShelf] = useState(shelfId);
  const [visible, setVisible] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');
  const [dialog, setDialog] = useState(false);

  const handleAddToLibrary = () => {
    setSnackBarMessage('add');
    setVisible(true);
    setShelf('2');
  };

  const handleRemoveFromLibrary = () => {
    setSnackBarMessage('remove');
    setVisible(true);
    setShelf('-1');
  };

  const onDismissSnackBar = () => setVisible(false);

  const Shelfs = {
    0: 'Favoritos',
    2: 'Por leer',
    3: 'Leyendo ahora',
    4: 'Leídos',
  };

  const snackBarMessages = {
    add: 'Añadido a la biblioteca',
    remove: 'Eliminado de la biblioteca',
  };

  const BookStatus = () =>
    shelf === '-1' ? (
      <Button onPress={handleAddToLibrary}>Añadir a la biblioteca</Button>
    ) : (
      <>
        <Button
          icon={({ size, color }) => (
            <MaterialCommunityIcons
              color={color}
              name="chevron-down"
              size={size}
            />
          )}
          onPress={() => setDialog(true)}
        >
          {Shelfs[shelf]}
        </Button>
        {dialog === true && (
          <Portal>
            <Dialog visible={dialog} onDismiss={() => setDialog(false)}>
              <Dialog.Title>Seleccionar estantería</Dialog.Title>
              <Dialog.Content>
                <RadioButton.Group
                  onValueChange={shelf => setShelf(shelf)}
                  value={shelf}
                >
                  <RadioButton.Item label="Favoritos" value="0" />
                  <RadioButton.Item label="Por leer" value="2" />
                  <RadioButton.Item label="Leyendo ahora" value="3" />
                  <RadioButton.Item label="Leídos" value="4" />
                </RadioButton.Group>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={() => setDialog(false)}>Seleccionar</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        )}
      </>
    );

  return (
    <>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={{
            flex: 1,
            paddingVertical: 16,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              source={{
                uri: thumbnail,
              }}
              style={{
                borderRadius: 2.5,
                height: 192,
                width: 192,
                resizeMode: 'contain',
              }}
            />
            <View
              style={{
                position: 'absolute',
              }}
            >
              {shelf === '3' && (
                <Button
                  icon={({ size, color }) => (
                    <MaterialCommunityIcons
                      color={color}
                      name="play"
                      size={size}
                    />
                  )}
                  mode="contained"
                  onPress={() =>
                    navigation.navigate('Leyendo', {
                      author,
                      currentPage,
                      pageCount,
                      thumbnail,
                      title,
                    })
                  }
                >
                  Leer
                </Button>
              )}
            </View>
          </View>
        </View>
        <View style={{ backgroundColor: 'white', padding: 16, flex: 2 }}>
          <View style={{ alignItems: 'center', marginBottom: 16 }}>
            <View style={{ alignItems: 'center', marginBottom: 16 }}>
              <Text style={material.title}>{title}</Text>
              <Text style={material.subheading}>{author}</Text>
            </View>
            <BookStatus />
          </View>
          {shelf === '3' && (
            <View
              style={{
                marginHorizontal: 16,
                marginBottom: 16,
              }}
            >
              <Progress currentPage={currentPage} pageCount={pageCount} />
            </View>
          )}
          <Divider />
          <View
            style={{
              marginTop: 16,
            }}
          >
            <View style={{ marginBottom: 16, flex: 1 }}>
              <Text style={material.title}>Descripción</Text>
              {<HTML source={{ html: description || '<p></p>' }} /> || (
                <Text>No hay descripción disponible.</Text>
              )}
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  ...material.caption,
                  textAlign: 'center',
                }}
              >
                {publisher} &#183; {pageCount} páginas
              </Text>
              {shelf !== '-1' && (
                <View style={{ alignItems: 'center', flex: 1 }}>
                  <Button
                    color="red"
                    justifyContent="center"
                    onPress={handleRemoveFromLibrary}
                    style={{ marginTop: 16 }}
                  >
                    Eliminar de la biblioteca
                  </Button>
                </View>
              )}
            </View>
          </View>
        </View>
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
        {snackBarMessages[snackBarMessage]}
      </Snackbar>
    </>
  );
};

export default BookScreen;
