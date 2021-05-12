import React, { useEffect, useRef } from 'react';
import { Alert, Image, Text, View } from 'react-native';
import {
  Button,
  Dialog as PaperDialog,
  Divider,
  IconButton,
} from 'react-native-paper';
import { material } from 'react-native-typography';
import { useDispatch, useSelector } from 'react-redux';

import Time from '../components/time';
import {
  incrementTime,
  readingSelector,
  resetTime,
  setReadingStatus,
  setUpdatingProgress,
} from '../redux/slices/reading-slice';
import {
  closeDialog,
  dialogSelector,
  openDialog,
} from '../redux/slices/dialog-slice';
import Dialog from '../components/dialog';

const ReadingScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const { dialogContent } = useSelector(dialogSelector);
  const { readingStatus, time, updatingProgress } = useSelector(
    readingSelector
  );

  const { authors, thumbnail, title } = route.params;

  useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        if (!readingStatus || updatingProgress) {
          return;
        }
        e.preventDefault();
        handlePause();
        dispatch(openDialog('goBack'));
      }),
    [navigation, readingStatus, updatingProgress]
  );

  const countRef = useRef(null);

  const handleAlert = action => {
    handlePause();
    dispatch(openDialog(action));
  };

  const handlePause = () => {
    clearInterval(countRef.current);
    dispatch(setReadingStatus('pause'));
  };

  const handlePlay = () => {
    dispatch(setReadingStatus('play'));
    countRef.current = setInterval(() => {
      dispatch(incrementTime());
    }, 1000);
  };

  const handleReset = () => {
    dispatch(closeDialog());
    clearInterval(countRef.current);
    dispatch(resetTime());
    dispatch(setReadingStatus(''));
  };

  const handleStop = () => {
    dispatch(closeDialog());
    dispatch(setUpdatingProgress(true));
    navigation.navigate('Actualizar progreso', { ...route.params });
  };

  const alerts = {
    reset: () =>
      Alert.alert(
        '¿Reiniciar?',
        'Se reiniciará el tiempo leído durante la sesión.',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
            onPress: () => {},
          },
          {
            text: 'Reiniciar',
            style: 'destructive',
            onPress: handleReset,
          },
        ]
      ),
    stop: () =>
      Alert.alert(
        '¿Finalizar?',
        'Se registrará el tiempo leído durante la sesión.',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
            onPress: () => {},
          },
          {
            text: 'Finalizar',
            style: 'destructive',
            onPress: handleStop,
          },
        ]
      ),
  };

  const Buttons = () => (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
      >
        <IconButton
          icon="restart"
          disabled={!readingStatus}
          onPress={() => handleAlert('reset')}
        />
        <IconButton
          icon={readingStatus === 'play' ? 'pause' : 'play'}
          onPress={readingStatus === 'play' ? handlePause : handlePlay}
          size={48}
        />
        <IconButton
          icon="stop"
          disabled={!readingStatus}
          onPress={() => handleAlert('stop')}
        />
      </View>
    </>
  );

  const dialogs = {
    goBack: (
      <>
        <PaperDialog.Title>¿Regresar?</PaperDialog.Title>
        <PaperDialog.Content>
          <Text>El tiempo leído durante la sesión no será registrado.</Text>
        </PaperDialog.Content>
        <PaperDialog.Actions>
          <Button onPress={() => dispatch(closeDialog())}>Cancelar</Button>
          <Button onPress={() => {}}>Regresar</Button>
        </PaperDialog.Actions>
      </>
    ),
    reset: (
      <>
        <PaperDialog.Title>¿Reiniciar?</PaperDialog.Title>
        <PaperDialog.Content>
          <Text>Se reiniciará el tiempo leído durante la sesión.</Text>
        </PaperDialog.Content>
        <PaperDialog.Actions>
          <Button onPress={() => dispatch(closeDialog())}>Cancelar</Button>
          <Button onPress={handleReset}>Reiniciar</Button>
        </PaperDialog.Actions>
      </>
    ),
    stop: (
      <>
        <PaperDialog.Title>¿Finalizar?</PaperDialog.Title>
        <PaperDialog.Content>
          <Text>Se registrará el tiempo leído durante la sesión.</Text>
        </PaperDialog.Content>
        <PaperDialog.Actions>
          <Button onPress={() => dispatch(closeDialog())}>Cancelar</Button>
          <Button onPress={handleStop}>Finalizar</Button>
        </PaperDialog.Actions>
      </>
    ),
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
        }}
      >
        <View
          style={{
            alignItems: 'center',
            backgroundColor: 'white',
            padding: 16,
          }}
        >
          <View style={{ alignItems: 'center' }}>
            <Text style={{ ...material.title, textAlign: 'center' }}>
              {title}
            </Text>
            <Text style={{ ...material.subheading, textAlign: 'center' }}>
              {authors && authors.join(', ')}
            </Text>
          </View>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={{ uri: thumbnail }}
            style={{
              borderRadius: 2.5,
              height: 256,
              width: 256,
              resizeMode: 'contain',
            }}
          />
        </View>
        <View style={{ backgroundColor: 'white', paddingHorizontal: 16 }}>
          <View style={{ alignItems: 'center', padding: 16 }}>
            <Text style={material.subheading}>Tiempo leído:</Text>
            <Time time={time} />
          </View>
          <Divider />
          <Buttons />
        </View>
      </View>
      {/* {Object.keys(dialogs).includes(dialogContent) && ( */}
      <Dialog>{dialogs[dialogContent]}</Dialog>
      {/* )} */}
    </>
  );
};

export default ReadingScreen;
