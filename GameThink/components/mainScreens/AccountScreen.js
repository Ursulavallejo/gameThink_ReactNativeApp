import { Text, View, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { globalStyles } from '../../styles/globalStyles'

export function AccountScreen() {
  const navigation = useNavigation()
  return (
    <View style={globalStyles.layout}>
      <Text style={globalStyles.title}>User info from JSON/storage?</Text>
      <Button title="Log Out" onPress={() => navigation.navigate('SignIn')} />
    </View>
  )
}
