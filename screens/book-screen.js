import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useLayoutEffect } from 'react';
import { Image, Text, View } from 'react-native';
import {
  Button,
  Dialog,
  Divider,
  IconButton,
  Portal,
  RadioButton,
  Snackbar,
  withTheme,
} from 'react-native-paper';
import HTML from 'react-native-render-html';
import { material } from 'react-native-typography';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';

import { LIBRARY, LIBRARY_ACTIONS } from '../constants';
import {
  bookSelector,
  closeSnackBar,
  getBookStatus,
  setSelectedShelf,
} from '../redux/slices/book-slice';
import {
  closeDialog,
  dialogSelector,
  openDialog,
} from '../redux/slices/dialog-slice';
import {
  addToLibrary,
  removeFromLibrary,
  updateShelf,
} from '../redux/slices/library-slice';
import Progress from '../components/progress';
import Layout from '../components/layout';

/**
 * Represents the book screen (the information shown when selecting a book)
 * @param {Object} navigation - To create the stack navigation
 * @param {------} route -
 * @param {------} colors -
 */

const BookScreen = ({ navigation, route, theme: { colors } }) => {
  const dispatch = useDispatch();

  const {
    adding,
    currentPage,
    isSnackBarVisible,
    loading,
    selectedShelf,
    shelfId,
    removing,
    snackBarMessage,
    updating,
  } = useSelector(bookSelector);

  const { isDialogVisible } = useSelector(dialogSelector);

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

  useFocusEffect(
    useCallback(() => {
      dispatch(
        getBookStatus({
          currentPage: route.params.currentPage,
          shelfId: route.params.shelfId,
        })
      );
    }, [dispatch])
  );

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
    !shelfId ? (
      <Button
        disabled={adding}
        onPress={() => dispatch(addToLibrary(route.params))}
      >
        Añadir a la biblioteca
      </Button>
    ) : (
      <Button
        icon={({ size, color }) => (
          <MaterialCommunityIcons
            color={color}
            name="chevron-down"
            size={size}
          />
        )}
        onPress={() => dispatch(openDialog())}
      >
        {LIBRARY[shelfId]}
      </Button>
    );

  return (
    <>
      <Layout refreshing={loading}>
        {thumbnail && (
          <View
            style={{
              backgroundColor: colors.greyLighter,
              flex: 1,
              paddingVertical: 16,
            }}
          >
            <View
              style={{
                alignItems: 'center',
                flex: 1,
                justifyContent: 'center',
              }}
            >
              <Image
                source={{ uri: thumbnail }}
                style={{
                  borderRadius: 2.5,
                  height: 192,
                  resizeMode: 'contain',
                  width: 192,
                }}
              />
            </View>
          </View>
        )}
        <View style={{ padding: 16 }}>
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
            {!loading && <BookStatus />}
          </View>
          {shelfId === '3' && (
            <>
              {pageCount && (
                <View
                  style={{
                    marginHorizontal: 16,
                    marginBottom: 16,
                  }}
                >
                  <Progress currentPage={currentPage} pageCount={pageCount} />
                </View>
              )}
              <View style={{ alignItems: 'center', marginBottom: 16 }}>
                <Button
                  dark
                  icon={({ size, color }) => (
                    <MaterialCommunityIcons
                      color={color}
                      name="play"
                      size={size}
                    />
                  )}
                  mode="contained"
                  onPress={() =>
                    navigation.replace('Leyendo', { ...route.params })
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
              {shelfId && (
                <View style={{ alignItems: 'center', flex: 1 }}>
                  <Button
                    color={colors.danger}
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
      </Layout>
      <Portal>
        <Dialog
          onDismiss={() => {
            dispatch(closeDialog());
            dispatch(setSelectedShelf(shelfId));
          }}
          visible={isDialogVisible}
        >
          <Dialog.Title>Seleccionar estantería</Dialog.Title>
          <Dialog.Content>
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
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                dispatch(updateShelf(route.params, selectedShelf, shelfId));
              }}
              disabled={updating}
            >
              Seleccionar
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Snackbar
        action={{
          label: 'Cerrar',
          onPress: () => {
            dispatch(closeSnackBar());
          },
        }}
        onDismiss={() => dispatch(closeSnackBar())}
        visible={isSnackBarVisible}
      >
        {LIBRARY_ACTIONS[snackBarMessage]}
      </Snackbar>
    </>
  );
};

export default withTheme(BookScreen);
