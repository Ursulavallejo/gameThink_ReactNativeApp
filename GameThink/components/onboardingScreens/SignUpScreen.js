import React from 'react'
import { Text, View, Button } from 'react-native'
import { globalStyles } from '../../styles/globalStyles'

export function SignUpScreen(props) {
  return (
    <View style={globalStyles.layout}>
      <Text style={globalStyles.title}>Sign Up Screen</Text>
      <Button
        title="Continue"
        onPress={() => props.navigation.navigate('Main')}
      />
    </View>
  )
}
