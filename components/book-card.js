import * as React from 'react';
import { Image, Text, View } from 'react-native';
import { Button, Card, TouchableRipple } from 'react-native-paper';
import { material } from 'react-native-typography';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Progress from '../components/progress';

const BookCard = ({ disabled, item, navigation, shelfId, ...rest }) => {
  const { authors, pageCount, thumbnail, title } = item;

  const currentPage = rest.currentPage || item.currentPage;

  return (
    <Card elevation={4}>
      <TouchableRipple
        borderless
        disabled={disabled}
        onPress={() => navigation.push('Libro', { ...item, shelfId })}
        style={{ borderRadius: 4, padding: 12 }}
      >
        <>
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
              {shelfId === '3' && (
                <View style={{ alignItems: 'flex-start', paddingTop: 12 }}>
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
                    onPress={() => navigation.push('Leyendo', { ...item })}
                  >
                    Leer
                  </Button>
                </View>
              )}
            </View>
          </View>
          {(disabled || shelfId === '3') && pageCount && (
            <View style={{ marginTop: 12 }}>
              <Progress currentPage={currentPage} pageCount={pageCount} />
            </View>
          )}
        </>
      </TouchableRipple>
    </Card>
  );
};

export default BookCard;
