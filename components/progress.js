import React from 'react';
import { Text, View } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { material } from 'react-native-typography';

const Progress = ({ currentPage, pageCount }) => (
  <View
    style={{
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    }}
  >
    <View style={{ marginRight: 8 }}>
      <Text style={material.caption}>Progreso:</Text>
    </View>
    <View style={{ flexGrow: 1, flexShrink: 1, marginRight: 8 }}>
      <ProgressBar progress={currentPage / pageCount} />
    </View>
    {currentPage && (
      <Text style={material.caption}>
        página {currentPage} de {pageCount}
      </Text>
    )}
  </View>
);

export default Progress;
