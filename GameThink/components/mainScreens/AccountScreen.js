import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { Text, View, Button, Alert, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
// import { globalStyles } from '../../styles/globalStyles'
import { MaterialIcons } from 'react-native-vector-icons'

import { logAllAsyncStorageData } from '../debug/debugScreen'

export function AccountScreen() {
  const [userData, setUserData] = useState(null)
  const navigation = useNavigation()

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user-signup-data')
      return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch (e) {
      console.error('Failed to fetch the data from storage')
    }
  }
  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getData()
      setUserData(data)
    }
    fetchUserData()
  }, [])

  // To see the information was saved in the Async Storage >> Debugging
  useEffect(() => {
    logAllAsyncStorageData()
  }, [])

  const handleAccountDeletion = () => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('user-signup-data')
              setUserData(null)
              alert('Account data cleared successfully!')
              navigation.navigate('SignIn')
            } catch (error) {
              console.error('Error clearing account data:', error)
              alert('Failed to clear account data')
            }
          },
        },
      ]
    )
  }

  return (
    <View className="flex-1 items-center justify-center bg-purple-200 p-4">
      {/* <Text style={globalStyles.title}>User info from JSON/storage?</Text> */}
      <View className="mb-6">
        {userData && userData.profilePicture ? (
          <Image
            source={{ uri: userData.profilePicture }}
            className="w-62 h-62 rounded-full border border-gray-300"
            resizeMode="cover"
          />
        ) : (
          <View className="w-32 h-32 rounded-full border border-gray-300 justify-center items-center bg-gray-200">
            <MaterialIcons name="person" size={60} color="gray" />
          </View>
        )}
      </View>

      <View className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        {userData ? (
          <>
            <Text className="text-xl font-bold mb-2">
              Name: {userData.name}
            </Text>
            <Text className="text-lg mb-2">Email: {userData.email}</Text>
            <Text className="text-lg mb-4">Birthday: {userData.birthday}</Text>
          </>
        ) : (
          <Text className="text-lg mb-4">No user data found</Text>
        )}
        <View className="flex-row justify-between mt-4">
          <Button
            title="Log Out"
            onPress={() => navigation.navigate('SignIn')}
          />
          <Button title="Remove Account" onPress={handleAccountDeletion} />
        </View>
      </View>
    </View>
  )
}
