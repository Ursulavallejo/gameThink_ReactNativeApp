import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { Text, View, Button, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { globalStyles } from '../../styles/globalStyles'

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
    <View style={globalStyles.layout}>
      <Text style={globalStyles.title}>User info from JSON/storage?</Text>

      <View>
        {userData ? (
          <>
            <Text>Name: {userData.name}</Text>
            <Text>Email: {userData.email}</Text>
            <Text>Birthday: {userData.birthday}</Text>
          </>
        ) : (
          <Text>No user data found</Text>
        )}
        <Button title="Log Out" onPress={() => navigation.navigate('SignIn')} />
        <Button title="Remove Account" onPress={handleAccountDeletion} />
      </View>
    </View>
  )
}
