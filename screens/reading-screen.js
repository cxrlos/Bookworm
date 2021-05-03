import React, { useEffect, useRef, useState } from 'react';
import { Image, Text, View } from 'react-native';
import {
  Button,
  Dialog,
  Divider,
  IconButton,
  Portal,
} from 'react-native-paper';
import { material } from 'react-native-typography';

import Time from '../components/time';

const ReadingScreen = ({ route, navigation }) => {
  const { authors, currentPage, pageCount, thumbnail, title } = route.params;

  const [dialog, setDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState();

  const [status, setStatus] = useState();
  const prevStatusRef = useRef();

  useEffect(() => {
    prevStatusRef.current = status;
  });

  const prevStatus = prevStatusRef.current;

  const [time, setTime] = useState(0);
  const countRef = useRef(null);

  const handlePause = () => {
    if (dialog) setDialog(false);
    clearInterval(countRef.current);
    setStatus('pause');
  };

  const handlePlay = () => {
    if (dialog) setDialog(false);
    setStatus('play');
    countRef.current = setInterval(() => {
      setTime(time => time + 1);
    }, 1000);
  };

  const handleStop = () => {
    setDialog(false);
    navigation.navigate('Actualizar progreso', {
      authors,
      currentPage,
      pageCount,
      thumbnail,
      time,
      title,
    });
  };

  const handleReset = () => {
    clearInterval(countRef.current);
    setTime(0);
    setStatus();
    setDialog(false);
  };

  const handleDialog = content => {
    handlePause();
    setDialog(true);
    setDialogContent(content);
  };

  const dialogs = {
    reset: (
      <>
        <Dialog.Title>¿Reiniciar sesión de lectura?</Dialog.Title>
        <Dialog.Content>
          <Text>Se reiniciará el tiempo leído durante la sesión.</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={prevStatus === 'play' ? handlePlay : handlePause}>
            Cancelar
          </Button>
          <Button onPress={handleReset}>Reiniciar</Button>
        </Dialog.Actions>
      </>
    ),
    stop: (
      <>
        <Dialog.Title>¿Finalizar sesión de lectura?</Dialog.Title>
        <Dialog.Content>
          <Text>Se registrará el tiempo leído durante la sesión.</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={prevStatus === 'play' ? handlePlay : handlePause}>
            Cancelar
          </Button>
          <Button onPress={handleStop}>Finalizar</Button>
        </Dialog.Actions>
      </>
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
          disabled={!status}
          onPress={() => handleDialog('reset')}
        />
        <IconButton
          icon={status === 'play' ? 'pause' : 'play'}
          onPress={status === 'play' ? handlePause : handlePlay}
          size={48}
        />
        <IconButton
          icon="stop"
          disabled={!status}
          onPress={() => handleDialog('stop')}
        />
      </View>
      {dialog === true && (
        <Portal>
          <Dialog visible={dialog} onDismiss={() => setDialog(false)}>
            {dialogs[dialogContent]}
          </Dialog>
        </Portal>
      )}
    </>
  );

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
      }}
    >
      <View
        style={{ alignItems: 'center', backgroundColor: 'white', padding: 16 }}
      >
        <View style={{ alignItems: 'center' }}>
          <Text style={material.title}>{title}</Text>
          <Text style={material.subheading}>{authors.join(', ')}</Text>
        </View>
      </View>
      <View style={{ alignItems: 'center' }}>
        <Image
          source={{
            uri: thumbnail,
          }}
          style={{
            borderRadius: 2.5,
            height: 256,
            width: 256,
            resizeMode: 'contain',
          }}
        />
      </View>
      <View
        style={{
          backgroundColor: 'white',
          paddingHorizontal: 16,
        }}
      >
        <View style={{ alignItems: 'center', padding: 16 }}>
          <Text style={material.subheading}>Tiempo leído:</Text>
          <Time time={time} />
        </View>
        <Divider />
        <Buttons />
      </View>
    </View>
  );
};

export default ReadingScreen;
