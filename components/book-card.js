import * as React from 'react';
import { Image, Text, View } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { material } from 'react-native-typography';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Progress from '../components/progress';

const BookCard = ({
  currentPage: propCurrentPage,
  disabled,
  item,
  navigation,
  shelf,
}) => {
  const {
    authors,
    currentPage: itemCurrentPage,
    description,
    id,
    pageCount,
    publisher,
    thumbnail,
    title,
  } = item;

  const currentPage = propCurrentPage || itemCurrentPage;

  return (
    <Card
      onPress={
        !disabled &&
        (() =>
          navigation.navigate('Libro', {
            authors,
            currentPage,
            description,
            id,
            pageCount,
            publisher,
            shelf,
            thumbnail,
            title,
          }))
      }
      style={{ padding: 12 }}
    >
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        {thumbnail && (
          <View
            style={{
              flex: 1,
              height: 128,
              marginRight: 12,
            }}
          >
            <Image
              source={{ uri: thumbnail }}
              style={{
                borderRadius: 2.5,
                flex: 1,
                resizeMode: 'contain',
              }}
            />
          </View>
        )}
        <View style={{ flex: 3 }}>
          <View>
            <Text numberOfLines={1} style={material.body2}>
              {title}
            </Text>
            {authors && (
              <Text numberOfLines={1} style={material.body1}>
                {authors.join(', ')}
              </Text>
            )}
          </View>
          {shelf === '3' && (
            <View style={{ alignItems: 'flex-start', paddingTop: 12 }}>
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
                    authors,
                    pageCount,
                    thumbnail,
                    title,
                  })
                }
              >
                Leer
              </Button>
            </View>
          )}
        </View>
      </View>
      {(disabled || shelf === '3') && (
        <View style={{ marginTop: 12 }}>
          <Progress currentPage={currentPage} pageCount={pageCount} />
        </View>
      )}
    </Card>
  );
};

export default BookCard;
