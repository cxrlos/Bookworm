import * as React from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import { Button, Card, ProgressBar } from 'react-native-paper';
import { material } from 'react-native-typography';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = SLIDER_WIDTH - 96;

const BookCard = ({ item }) => (
  <Card
    onPress={() => item.navigation.navigate('Libro', { bookId: item.id })}
    style={{ padding: 12 }}
  >
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 12,
      }}
    >
      <View
        style={{
          flex: 1,
          height: 128,
          marginRight: 12,
        }}
      >
        <Image
          source={{ uri: item.thumbnail }}
          style={{
            borderRadius: 2.5,
            flex: 1,
            resizeMode: 'contain',
          }}
        />
      </View>
      <View style={{ flex: 3 }}>
        <View style={{ marginBottom: 12 }}>
          <Text style={material.body2}>{item.title}</Text>
          <Text style={material.body1}>{item.author}</Text>
        </View>
        <View style={{ alignItems: 'flex-start' }}>
          <Button
            icon={({ size, color }) => (
              <MaterialCommunityIcons color={color} name="play" size={size} />
            )}
            mode="contained"
            // onPress={() => navigation.navigate('Leyendo', { bookInfo })}
          >
            Leer
          </Button>
        </View>
      </View>
    </View>
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
        <ProgressBar progress={0.5} />
      </View>
      <Text style={material.caption}>página 1 de {item.pageCount}</Text>
    </View>
  </Card>
);

export default BookCard;
