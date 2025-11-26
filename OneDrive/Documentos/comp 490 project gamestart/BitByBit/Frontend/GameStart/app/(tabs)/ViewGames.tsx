import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'

// Game type using RAWG API fields + price generated for games sinc eit doesnt give price
//Other APIs are same if not worse
type Game = {
  id: number
  name: string
  platforms: string
  rating: number
  price: number
  image: string
}

export default function ViewGames() {
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  const API_KEY = 'c1db19e921334df6accd48b12d95fb5a'

  // Fetch games from RAWG API
  useEffect(() => {
    fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=100`)
      .then(res => res.json())
      .then(data => {
        const formattedGames: Game[] = data.results.map((g: any) => ({
          id: g.id,
          name: g.name,
          platforms: g.platforms ? g.platforms.map((p: any) => p.platform.name).join(', ') : 'Unknown',
          rating: g.rating,
          price: Math.floor(Math.random() * 50 + 10), // Only price is generated
          image: g.background_image
        }))
        setGames(formattedGames)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  // Filter games based on search input
  const filteredGames = games.filter(g =>
    g.name.toLowerCase().includes(search.toLowerCase())
  )

  // Render each game
  const renderGame = ({ item }: { item: Game }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.platform}>{item.platforms}</Text>
        <Text style={styles.rating}>⭐ {item.rating}</Text>
        <View style={styles.bottomRow}>
          <Text style={styles.price}>${item.price}</Text>
          <TouchableOpacity style={styles.buyButton}>
            <Text style={styles.buyText}>Buy</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#00ffff" />
        <Text style={{ color: '#fff', marginTop: 10 }}>Loading games...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search games..."
        placeholderTextColor="#888"
        style={styles.searchBar}
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredGames}
        keyExtractor={item => item.id.toString()}
        renderItem={renderGame}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
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
    flexDirection: 'row',
    backgroundColor: '#111',
    marginHorizontal: 8,
    marginVertical: 4,
    borderRadius: 10,
    overflow: 'hidden',
  },

  image: {
    width: 120,
    height: 120,
  },

  info: {
    flex: 1,
    padding: 8,
    justifyContent: 'space-between',
  },

  name: {
    color: '#00ffff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  platform: {
    color: '#ccc',
    fontSize: 12,
    marginTop: 2,
  },

  rating: {
    color: '#ccc',
    fontSize: 12,
    marginTop: 2,
  },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },

  price: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },

  buyButton: {
    backgroundColor: '#00ffff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },

  buyText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
  },
})
