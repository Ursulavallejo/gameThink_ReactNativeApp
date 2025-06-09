import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  SafeAreaView,
  Pressable,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native'

import { styled } from 'nativewind'

const StyledPressable = styled(Pressable)

const API_KEY = 'f14f4f5fe2fe4962b6628f6016ac2258' // RAWG.io

export function CatalogScreen() {
  const [games, setGames] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGame, setSelectedGame] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=50`)
      .then((response) => response.json())
      .then((result) => {
        setGames(result.results)
      })
      .catch((error) => console.error('Error fetching data:', error))
  }, [])

  // Cuando escribes en la búsqueda
  useEffect(() => {
    if (searchTerm.length < 3) return

    fetch(
      `https://api.rawg.io/api/games?search=${encodeURIComponent(
        searchTerm
      )}&key=${API_KEY}&page_size=50`
    )
      .then((response) => response.json())
      .then((result) => setGames(result.results))
      .catch((error) => console.error('Search error:', error))
  }, [searchTerm])

  const handleSearch = (text) => {
    setSearchTerm(text)
  }

  const getScoreColor = (score) => {
    if (score < 40) return 'text-red-500'
    if (score < 85) return 'text-yellow-500'
    return 'text-green-500'
  }

  const renderItem = ({ item }) => {
    const imageUrl = item.background_image
    const scoreColor = getScoreColor(item.rating * 20) // 0-5 → 0-100 escala

    return (
      <StyledPressable
        className="active:opacity-70 border border-purple-700 mb-3 bg-purple-900 rounded-xl p-4 flex-row"
        onPress={() => {
          setSelectedGame(item)
          setModalVisible(true)
        }}
      >
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <View style={styles.card} className="ml-4 flex-shrink">
          <Text className="text-white text-lg font-bold mb-2">{item.name}</Text>
          <Text className="text-white font-bold mb-2" style={styles.scoreLabel}>
            Rating:
            <Text
              className={`text-xl font-bold ml-2 ${scoreColor}`}
              style={styles.scoreValue}
            >
              {item.rating}
            </Text>
          </Text>
          <Text className="text-gray-300 mt-2">
            Released: {item.released || 'Unknown'}
          </Text>
        </View>
      </StyledPressable>
    )
  }

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: '#330169' }}>
      <StatusBar style="light" />
      <View className="p-4">
        <TextInput
          className="h-12 border border-purple-600 rounded-lg px-4 text-white"
          placeholder="Search... (min 3 chars)"
          placeholderTextColor="#aaa"
          value={searchTerm}
          onChangeText={handleSearch}
        />
      </View>
      <FlatList
        className="m-3 p-2"
        data={games}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      {selectedGame && (
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <ScrollView contentContainerStyle={styles.modalContent}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>{selectedGame.name}</Text>
                  {selectedGame.background_image && (
                    <Image
                      source={{
                        uri: selectedGame.background_image,
                      }}
                      style={styles.modalImage}
                    />
                  )}
                  <Text style={styles.modalDescription}>
                    Released: {selectedGame.released || 'Unknown'}
                  </Text>
                  <Text style={styles.modalDescription}>
                    Rating: {selectedGame.rating}
                  </Text>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.closeButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 42,
  },
  image: {
    width: 107,
    height: 147,
    borderRadius: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalImage: {
    width: 200,
    height: 250,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  scoreLabel: {
    marginLeft: 10,
  },
  scoreValue: {
    paddingLeft: 28,
  },
})
