import React, { useEffect, useLayoutEffect } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import {
  Button,
  Divider,
  Dialog as PaperDialog,
  IconButton,
  RadioButton,
  Snackbar,
} from 'react-native-paper';
import HTML from 'react-native-render-html';
import { material } from 'react-native-typography';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '../components/dialog';

import Progress from '../components/progress';
import { LIBRARY, LIBRARY_ACTIONS } from '../constants';
import {
  bookSelector,
  closeSnackBar,
  setCurrentPage,
  setSelectedShelf,
  setShelfId,
} from '../redux/slices/book-slice';
import {
  addToLibrary,
  removeFromLibrary,
  updateShelf,
} from '../redux/slices/library-slice';
import { dialogSelector, openDialog } from '../redux/slices/dialog-slice';

const BookScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const {
    adding,
    currentPage,
    isSnackBarVisible,
    selectedShelf,
    removing,
    shelfId,
    snackBarMessage,
    updating,
  } = useSelector(bookSelector);

  const { dialogContent, isDialogVisible } = useSelector(dialogSelector);

  const {
    authors,
    description,
    id: bookId,
    pageCount,
    publisher,
    thumbnail,
    title,
  } = route.params;

  useEffect(() =>
    navigation.addListener('beforeRemove', e => {
      if (!isDialogVisible) return;
      e.preventDefault();
    })
  );

  useEffect(() => {
    dispatch(setShelfId(route.params.shelfId || '-1'));
    dispatch(setSelectedShelf(route.params.shelfId));
    dispatch(setCurrentPage(route.params.currentPage || 0));
  }, [dispatch]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="magnify"
          onPress={() => navigation.navigate('Buscar')}
        />
      ),
    });
  });

  const BookStatus = () =>
    shelfId === '-1' ? (
      <Button
        disabled={adding}
        onPress={() => dispatch(addToLibrary(route.params))}
      >
        Añadir a la biblioteca
      </Button>
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
          onPress={() => dispatch(openDialog('selectShelf'))}
        >
          {LIBRARY[shelfId]}
        </Button>
      </>
    );

  const selectShelf = () => (
    <>
      <PaperDialog.Title>Seleccionar estantería</PaperDialog.Title>
      <PaperDialog.Content>
        <RadioButton.Group
          onValueChange={selectedShelf =>
            dispatch(setSelectedShelf(selectedShelf))
          }
          value={selectedShelf}
        >
          <RadioButton.Item label="Favoritos" value="0" />
          <RadioButton.Item label="Por leer" value="2" />
          <RadioButton.Item label="Leyendo ahora" value="3" />
          <RadioButton.Item label="Leídos" value="4" />
        </RadioButton.Group>
      </PaperDialog.Content>
      <PaperDialog.Actions>
        <Button
          onPress={() => {
            dispatch(updateShelf(route.params, selectedShelf, shelfId));
          }}
          disabled={updating}
        >
          Seleccionar
        </Button>
      </PaperDialog.Actions>
    </>
  );

  return (
    <>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {thumbnail && (
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
            </View>
          </View>
        )}
        <View style={{ backgroundColor: 'white', padding: 16, flex: 2 }}>
          <View style={{ alignItems: 'center', marginBottom: 16 }}>
            <View style={{ marginBottom: 16 }}>
              <Text style={{ ...material.title, textAlign: 'center' }}>
                {title}
              </Text>
              {authors && (
                <Text style={{ ...material.subheading, textAlign: 'center' }}>
                  {authors.join(', ')}
                </Text>
              )}
            </View>
            <BookStatus />
          </View>
          {shelfId === '3' && (
            <>
              <View
                style={{
                  marginHorizontal: 16,
                  marginBottom: 16,
                }}
              >
                <Progress currentPage={currentPage} pageCount={pageCount} />
              </View>
              <View style={{ alignItems: 'center', marginBottom: 16 }}>
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
                    navigation.navigate('Leyendo', { ...route.params })
                  }
                >
                  Leer
                </Button>
              </View>
            </>
          )}
          <Divider />
          <View
            style={{
              marginTop: 16,
            }}
          >
            <View style={{ marginBottom: 16, flex: 1 }}>
              <Text style={{ ...material.title, marginBottom: 12 }}>
                Descripción
              </Text>
              {description ? (
                <HTML source={{ html: description || '<p></p>' }} />
              ) : (
                <Text>No hay descripción disponible.</Text>
              )}
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              {publisher && (
                <Text style={{ ...material.caption }}>{publisher}</Text>
              )}
              {publisher && pageCount && (
                <Text style={{ ...material.caption }}> &#183; </Text>
              )}
              {pageCount && (
                <Text style={{ ...material.caption }}>{pageCount} páginas</Text>
              )}
            </View>
            <View>
              {shelfId !== '-1' && (
                <View style={{ alignItems: 'center', flex: 1 }}>
                  <Button
                    color="red"
                    justifyContent="center"
                    onPress={() => dispatch(removeFromLibrary(bookId, shelfId))}
                    style={{ marginTop: 16 }}
                    disabled={removing}
                  >
                    Eliminar de la biblioteca
                  </Button>
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
      <Dialog>{selectShelf()}</Dialog>
      <Snackbar
        visible={isSnackBarVisible}
        onDismiss={() => dispatch(closeSnackBar())}
        action={{
          label: 'Cerrar',
          onPress: () => {
            dispatch(closeSnackBar());
          },
        }}
      >
        {LIBRARY_ACTIONS[snackBarMessage]}
      </Snackbar>
    </>
  );
};

export default BookScreen;
