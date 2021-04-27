import React from 'react';
import { Text, View } from 'react-native';
import { material } from 'react-native-typography';

const Time = ({ time }) => {
  const getSeconds = `0${time % 60}`.slice(-2);
  const minutes = `${Math.floor(time / 60)}`;
  const getMinutes = `0${minutes % 60}`.slice(-2);
  const getHours = `0${Math.floor(time / 3600)}`.slice(-2);

  return (
    <View style={{ flexDirection: 'row' }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginRight: 8,
        }}
      >
        <Text style={{ ...material.headline, marginRight: 4 }}>{getHours}</Text>
        <Text style={material.caption}>h</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginRight: 8,
          alignItems: 'center',
        }}
      >
        <Text style={{ ...material.headline, marginRight: 4 }}>
          {getMinutes}
        </Text>
        <Text style={material.caption}>m</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ ...material.headline, marginRight: 4 }}>
          {getSeconds}
        </Text>
        <Text style={material.caption}>s</Text>
      </View>
    </View>
  );
};

export default Time;
