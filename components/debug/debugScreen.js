import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const DebugScreen = () => {
  useEffect(() => {
    logAllAsyncStorageData()
  }, [])

  return (
    <View>
      <Text>Check the terminal for AsyncStorage data</Text>
    </View>
  )
}

export const logAllAsyncStorageData = async () => {
  try {
    // Retrieve all keys
    const keys = await AsyncStorage.getAllKeys()
    console.log('Keys:', keys)

    // Retrieve all values for the keys
    const allData = await AsyncStorage.multiGet(keys)

    // Log each key-value pair
    allData.forEach(([key, value]) => {
      console.log(`Key: ${key}, Value: ${value}`)
    })
  } catch (error) {
    console.error('Failed to retrieve data from AsyncStorage:', error)
  }
}

export default DebugScreen
