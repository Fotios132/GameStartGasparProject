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

type Accessory = {
  id: number;
  name: string;
  price: string;
  image: any;
  description: string;
};

export default function ViewAccessories() {
  const [accessories, setAccessories] = useState<Accessory[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const data: Accessory[] = [
      { id: 1, name: 'PS5 Controller', price: '49.99', image: require('../../assets/images/ps5controller.png'), description: 'DualSense wireless controller.' },
      { id: 2, name: 'Switch Joy-Cons', price: '69.99', image: require('../../assets/images/switch1joycons.png'), description: 'Joy-Con pair for Nintendo Switch.' },
      { id: 3, name: 'Godzilla T-Shirt', price: '19.99', image: require('../../assets/images/godzillatshirt.png'), description: 'Kaiju-themed shirt.' },
     { id: 1, name: 'Switch Joy-Cons', price: '69.99', image: require('../../assets/images/switch1joycons.png'), description: 'Colorful Nintendo Switch controllers.' },
      { id: 3, name: 'Yu-Gi-Oh Quarter Century Stampede', price: '12.99', image: require('../../assets/images/yugiohquartercenturystampede.png'), description: 'Collector series card pack.' },
      { id: 4, name: 'Kirby Plushy', price: '29.99', image: require('../../assets/images/kirbysplushy.png'), description: 'Soft and adorable Kirby plush.' },
        { id: 5, name: 'RIG 800 PRO', price: '159.99', image: require('../../assets/images/rig800pro.png'), description: 'Wireless gaming headset with dock.' },


    ];
    setAccessories(data);
  }, []);

  const filtered = accessories.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  const { width } = Dimensions.get('window');
  const cardWidth = width / 2 - 16;

  const renderItem = ({ item }: { item: Accessory }) => (
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
        placeholder="Search accessories..."
        placeholderTextColor="#888"
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filtered}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
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
