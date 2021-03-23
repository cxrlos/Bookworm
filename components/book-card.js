import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import {
  Button,
  Card,
  Title,
  ProgressBar,
  Colors,
  Paragraph,
  Subheading,
} from 'react-native-paper';

const LeftContent = props => (
  <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
);

const BookCard = () => (
  <Card style={{ marginTop: 15 }}>
    <Card.Content>
      <View style={styles.row}>
        <Image
          source={require('../assets/ken-follet.jpg')}
          style={styles.book}
        />
        <View>
          <Title>The Pillars of the Earth</Title>
          <Subheading>Ken Follet</Subheading>
          <Paragraph>Página 50 de 100</Paragraph>
          <ProgressBar progress={0.5} color={Colors.red800} />
        </View>
      </View>
    </Card.Content>
    <Card.Actions>
      <Button mode="contained" onPress={() => console.log('Pressed')}>
        Reanudar lectura
      </Button>
    </Card.Actions>
  </Card>
);

const styles = StyleSheet.create({
  book: {
    width: 66,
    height: '100%',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default BookCard;
