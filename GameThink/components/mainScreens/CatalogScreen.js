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

export function CatalogScreen() {
  const [games, setGames] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGame, setSelectedGame] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    fetch(
      'https://internal-prod.apigee.fandom.net/v1/xapi/finder/metacritic/web?sortBy=-metaScore&productType=games&page=1&releaseYearMin=1958&releaseYearMax=2024&offset=0&limit=50&apiKey=1MOZgmNFxvmljaQR1X9KAij9Mo4xAY3u'
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.data && result.data.items) {
          setGames(result.data.items)
        }
      })
      .catch((error) => console.error('Error fetching data:', error))
  }, [])

  const handleSearch = (text) => {
    setSearchTerm(text)
  }

  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getScoreColor = (score) => {
    const percentage = (score / 100) * 100
    if (percentage < 40) return 'text-red-500'
    if (percentage < 85) return 'text-yellow-500'
    return 'text-green-500'
  }

  const renderItem = ({ item }) => {
    const imageUrl = `https://www.metacritic.com/a/img/${item.image.bucketType}${item.image.bucketPath}`
    const scoreColor = getScoreColor(item.criticScoreSummary.score)

    return (
      <StyledPressable
        className="active:opacity-70 border border-purple-700 active:border-purple-500 mb-3 bg-purple-900 rounded-xl p-4 flex-row"
        onPress={() => {
          setSelectedGame(item)
          setModalVisible(true)
        }}
      >
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <View style={styles.card} className="ml-4 flex-shrink">
          <View className="flex-shrink">
            <Text className="text-white text-lg font-bold mb-2">
              {item.title}
            </Text>
            <Text
              className="text-white  font-bold mb-2 "
              style={styles.scoreLabel}
            >
              Score:
              <Text
                className={`text-xl font-bold ml-2 ${scoreColor}`}
                style={styles.scoreValue}
              >
                {item.criticScoreSummary.score}
              </Text>
            </Text>
            <Text className="text-gray-300 mt-2">
              {item.description.slice(0, 100)}
            </Text>
          </View>
        </View>
      </StyledPressable>
    )
  }

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: '#330169' }}>
      <StatusBar style="light" />
      <View className="p-4 ">
        <TextInput
          className="h-12 border border-purple-600 rounded-lg px-4 text-white"
          placeholder="Search..."
          placeholderTextColor="#aaa"
          value={searchTerm}
          onChangeText={handleSearch}
        />
      </View>
      <FlatList
        className="m-3 p-2 "
        data={filteredGames}
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
                  <Text style={styles.modalTitle}>{selectedGame.title}</Text>
                  <Image
                    source={{
                      uri: `https://www.metacritic.com/a/img/${selectedGame.image.bucketType}${selectedGame.image.bucketPath}`,
                    }}
                    style={styles.modalImage}
                  />
                  <Text style={styles.modalDescription}>
                    {selectedGame.description}
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
  },
  modalImage: {
    width: 150,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 20,
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
