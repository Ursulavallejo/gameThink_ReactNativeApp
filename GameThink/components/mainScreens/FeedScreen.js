import {
  Text,
  View,
  StatusBar,
  SafeAreaView,
  FlatList,
  Pressable,
  Modal,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image,
  ScrollView,
} from 'react-native'

import { useEffect, useState } from 'react'
import { globalStyles } from '../../styles/globalStyles'
import { Card } from '../Card'
import { Heading, Title, Post } from '../BasicReusableComponents'

import { styled } from 'nativewind'

const StyledPressable = styled(Pressable)

export function FeedScreen() {
  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [message, setMessage] = useState('')
  const [isContactMode, setIsContactMode] = useState(false)

  useEffect(() => {
    fetch(
      'https://raw.githubusercontent.com/Ursulavallejo/gameThink_ReactNativeApp/main/GameThink/data/users.json'
    )
      .then((response) => response.json())
      .then((result) => {
        setUsers(result.users)
      })
  }, [])

  useEffect(() => {
    fetch(
      'https://raw.githubusercontent.com/Ursulavallejo/gameThink_ReactNativeApp/main/GameThink/data/posts.json'
    )
      .then((response) => response.json())
      .then((result) => {
        setPosts(result.posts)
      })
  }, [])

  const handleSendMessage = () => {
    // Handle sending the message to the user (this could be an API call, etc.)
    console.log(`Message to ${selectedUser.name}: ${message}`)
    setMessage('')
    setIsContactMode(false)
    setModalVisible(false)
  }

  return (
    <SafeAreaView style={[globalStyles.layout, { backgroundColor: '#330169' }]}>
      <StatusBar barStyle="light-content" backgroundColor="#330169" />
      <View>
        <Heading>My Friends:</Heading>

        {/* print all the Api */}
        {/* <Text>{JSON.stringify(users)}</Text> */}

        <FlatList
          data={users}
          horizontal
          contentContainerStyle={{ paddingHorizontal: 24 }}
          renderItem={({ item }) => (
            <StyledPressable
              className="active:opacity-70 "
              onPress={() => {
                setSelectedUser(item)
                setModalVisible(true)
              }}
            >
              <Card name={item.name} imageProfile={item.imageProfile} />
            </StyledPressable>
          )}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View>
        <Heading>Posts</Heading>
        {/* I cant use Scroll View but cant see all posts ... How to solve it?i se paddin g but is excesive */}
        <FlatList
          contentContainerStyle={{ paddingBottom: '60%' }}
          data={posts}
          vertical
          renderItem={({ item }) => (
            <Post
              image={item.image}
              title={item.title}
              description={item.description}
              author={item.author}
            />
          )}
          keyExtractor={(post) => post.id}
        />
      </View>

      {/* </ScrollView> */}

      {selectedUser && (
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              {/* //THIS is not working  keyboard overlay*/}
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.modalContainer}
              >
                <ScrollView contentContainerStyle={styles.modalContent}>
                  <Image
                    source={{ uri: selectedUser.imageProfile }}
                    style={styles.modalImage}
                  />
                  <Text style={styles.modalTitle}>{selectedUser.name}</Text>

                  <Title>About me:</Title>
                  <Text style={styles.modalText}>{selectedUser.on_me}</Text>
                  <Title>Favorite Games: </Title>
                  <Text style={styles.modalText}>
                    {selectedUser.favorite_games.join(', ')}
                  </Text>

                  {isContactMode && (
                    <TextInput
                      style={styles.input}
                      placeholder="Write a message..."
                      placeholderTextColor="#808080"
                      value={message}
                      onChangeText={setMessage}
                    />
                  )}

                  <TouchableOpacity
                    style={styles.sendButton}
                    onPress={() => {
                      if (isContactMode) {
                        handleSendMessage()
                      } else {
                        setIsContactMode(true)
                      }
                    }}
                  >
                    <Text style={styles.sendButtonText}>
                      {isContactMode ? 'Send' : 'Contact'}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.closeButtonText}>Close</Text>
                  </TouchableOpacity>
                </ScrollView>
              </KeyboardAvoidingView>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  )
}

const styles = {
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContainer: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalImage: {
    height: 90,
    width: 90,
    borderRadius: 45,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'justify',
    padding: 10,
  },
  input: {
    width: '100%',
    borderColor: '#330169',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  sendButton: {
    backgroundColor: '#330169',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#aaa',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
}
