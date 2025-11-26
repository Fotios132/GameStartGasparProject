import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

type Console = {
  id: number;
  name: string;
  price: string;
  image: any;
  description: string;
};

export default function ViewConsoles() {
  const [consoles, setConsoles] = useState<Console[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const data: Console[] = [
      { id: 1, name: 'PlayStation 5', price: '499.99', image: require('../../assets/images/ps5.png'), description: 'Incredible exclusives.' },
      { id: 2, name: 'PlayStation 4', price: '299.99', image: require('../../assets/images/ps4.png'), description: 'Huge game library.' },
      { id: 3, name: 'Xbox Series X', price: '499.99', image: require('../../assets/images/xboxx.png'), description: 'Powerful next-gen console.' },
      { id: 4, name: 'Xbox Series S', price: '299.99', image: require('../../assets/images/xboxs.png'), description: 'Compact and fast.' },
      { id: 5, name: 'Nintendo Switch 1', price: '349.99', image: require('../../assets/images/switch1.png'), description: 'Portable fun.' },
      { id: 6, name: 'Nintendo Switch 2', price: '399.99', image: require('../../assets/images/switch2.png'), description: 'OLED display model.' },
    ];
    setConsoles(data);
  }, []);

  const filteredConsoles = consoles.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const { width } = Dimensions.get('window');
  const cardWidth = width / 2 - 16;

  const renderConsole = ({ item }: { item: Console }) => (
    <View style={[styles.card, { width: cardWidth }]}>
      <Image source={item.image} style={styles.cardImage} resizeMode="contain" />
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.priceText}>${item.price}</Text>
      <TouchableOpacity style={styles.buyButton}>
        <Text style={styles.buyText}>Buy</Text>
      </TouchableOpacity>
      <Text style={styles.cardDescription}>{item.description}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search consoles..."
        placeholderTextColor="#888"
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredConsoles}
        keyExtractor={item => item.id.toString()}
        renderItem={renderConsole}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  searchBar: {
    height: 40,
    backgroundColor: '#222',
    color: '#fff',
    margin: 8,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: '#111',
    borderRadius: 12,
    margin: 8,
    padding: 10,
    alignItems: 'center',
  },
  cardImage: {
    width: '100%',
    height: 140,
    borderRadius: 8,
    marginBottom: 6,
  },
  cardTitle: {
    color: '#00ffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  priceText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
  },
  buyButton: {
    backgroundColor: '#00ffff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginBottom: 4,
  },
  buyText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
  },
  cardDescription: {
    color: '#aaa',
    fontSize: 12,
    textAlign: 'center',
  },
});

