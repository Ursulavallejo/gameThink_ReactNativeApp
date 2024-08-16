import { Text, View, Button } from 'react-native'
import { globalStyles } from '../../styles/globalStyles'
// import { Formik } from 'formik'

export function SignInScreen(props) {
  return (
    <View style={globalStyles.layout}>
      <Text style={globalStyles.title}>Sign In Screen</Text>
      <Button
        title="Sign Up"
        onPress={() => props.navigation.navigate('SignUp')}
      />
    </View>
  )
}
