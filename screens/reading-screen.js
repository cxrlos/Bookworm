import { StackActions } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { Alert, Image, Text, View } from 'react-native';
import { Divider, IconButton, withTheme } from 'react-native-paper';
import { material } from 'react-native-typography';
import { useDispatch, useSelector } from 'react-redux';

import Time from '../components/time';
import {
  incrementTime,
  readingSelector,
  resetTime,
  setReadingStatus,
  setSessionDuration,
} from '../redux/slices/reading-slice';
import { dialogContent } from '../redux/slices/dialog-slice';

/**
 * Represents the screen that is shown to the user when a reading session is going to start.
 * @param {Object} navigation - To create the stack navigation
 * @param {------} route -
 * @param {------} colors -
 */

const ReadingScreen = ({ navigation, route, theme: { colors } }) => {
  const dispatch = useDispatch();

  const { readingStatus, time } = useSelector(readingSelector);

  const { authors, thumbnail, title } = route.params;

  useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        if (!readingStatus) return;
        e.preventDefault();
        handlePause();
        Alert.alert(
          '¿Regresar?',
          'El tiempo leído durante la sesión no será registrado.',
          [
            { text: 'Cancelar', style: 'cancel', onPress: () => {} },
            {
              text: 'Regresar',
              style: 'destructive',
              onPress: () => {
                dispatch(setSessionDuration(time));
                dispatch(resetTime());
                navigation.dispatch(e.data.action);
              },
            },
          ]
        );
      }),
    [navigation, readingStatus]
  );

  const countRef = useRef(null);

  const handleDialog = action => {
    handlePause();
    dialogs[action]();
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
    clearInterval(countRef.current);
    dispatch(resetTime());
  };

  const handleStop = () => {
    dispatch(setSessionDuration(time));
    dispatch(resetTime());
    navigation.dispatch(
      StackActions.replace('Actualizar progreso', { ...route.params })
    );
  };

  const dialogs = {
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
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <IconButton
          icon="restart"
          disabled={!readingStatus}
          onPress={() => handleDialog('reset')}
        />
        <IconButton
          icon={readingStatus === 'play' ? 'pause' : 'play'}
          onPress={readingStatus === 'play' ? handlePause : handlePlay}
          size={48}
        />
        <IconButton
          icon="stop"
          disabled={!readingStatus}
          onPress={() => handleDialog('stop')}
        />
      </View>
    </>
  );

  return (
    <>
      <View
        style={{
          backgroundColor: colors.greyLighter,
          flex: 1,
          justifyContent: 'space-between',
        }}
      >
        <View
          style={{
            alignItems: 'center',
            backgroundColor: colors.background,
            padding: 16,
          }}
        >
          <Text style={{ ...material.title, textAlign: 'center' }}>
            {title}
          </Text>
          <Text style={{ ...material.subheading, textAlign: 'center' }}>
            {authors && authors.join(', ')}
          </Text>
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
        <View
          style={{ backgroundColor: colors.background, paddingHorizontal: 16 }}
        >
          <View style={{ alignItems: 'center', padding: 16 }}>
            <Text style={material.subheading}>Tiempo leído:</Text>
            <Time time={time} />
          </View>
          <Divider />
          <Buttons />
        </View>
      </View>
      {dialogs[dialogContent]}
    </>
  );
};

export default withTheme(ReadingScreen);
