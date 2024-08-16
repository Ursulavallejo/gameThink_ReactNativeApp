import { Text, View } from 'react-native'
import { globalStyles } from '../../styles/globalStyles'

export function FeedScreen() {
  return (
    <View style={globalStyles.layout}>
      <Text style={globalStyles.title}>We Go Further Together!!</Text>
      <Text style={globalStyles.title}>Feed!</Text>
    </View>
  )
}
