import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, Image } from 'react-native';

const data = [
  { key: 'A' }, { key: 'B' }, { key: 'C' }, { key: 'D' }, { key: 'E' }, { key: 'F' }, { key: 'G' }, { key: 'H' }, { key: 'I' }, { key: 'J' },
];
const images = [
  require("../../assets/images/Mazos/2/2_0.jpg"),
  require("../../assets/images/Mazos/2/2_1.jpg"),
  require("../../assets/images/Mazos/2/2_2.jpg"),
  require("../../assets/images/Mazos/2/2_3.jpg"),
  require("../../assets/images/Mazos/2/2_4.jpg"),
  require("../../assets/images/Mazos/2/2_5.jpg"),
  require("../../assets/images/Mazos/2/2_6.jpg"),
  require("../../assets/images/Mazos/2/2_7.jpg"),
  require("../../assets/images/Mazos/2/2_8.jpg"),
];

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);
  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }
  return data;
};

const numColumns = 3;
const cardWidth = Dimensions.get('window').width / numColumns;

export default class Mazos extends React.Component {
  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <View style={styles.item}>
        <Image
          source={images[index % images.length]}
          style={{
            width: cardWidth - 10,
            height: cardWidth * 1.5,
            backgroundColor: 'powderblue',
          }}
        />
      </View>
    );
  };

  render() {
    return (
      <FlatList
        data={formatData(data, numColumns)}
        style={styles.container}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => item.key || index.toString()}
        numColumns={numColumns}
        scrollEnabled={false} // Esta linea evita el error VirtualizedLists should never be nested inside plain ScrollViews
      />
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  item: {
    backgroundColor: '#4D243D',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: cardWidth * 1.5,
    shadowColor: '#ffffffs',       // Color de la sombra
    shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra
    shadowOpacity: 0.3,        // Opacidad de la sombra (0 - 1)
    shadowRadius: 4,           // Radio de desenfoque de la sombra
    elevation: 5,              // Sombra en Android
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
});
