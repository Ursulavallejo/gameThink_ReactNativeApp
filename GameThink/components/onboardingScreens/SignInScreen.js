import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
} from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
// import { styled } from 'nativewind'

export function SignInScreen(props) {
  // Validation schema with Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    agreement: Yup.boolean()
      .oneOf([true], 'You must accept the terms and conditions')
      .required('You must accept the terms and conditions'),
  })

  const onSubmit = async (values, { resetForm }) => {
    try {
      // Retrieve user data from AsyncStorage
      const jsonValue = await AsyncStorage.getItem('user-signup-data')
      const storedUserData = jsonValue != null ? JSON.parse(jsonValue) : null

      if (
        storedUserData &&
        storedUserData.email === values.email &&
        storedUserData.password === values.password
      ) {
        alert(`Welcome, ${storedUserData.name}!`)
        resetForm()
        props.navigation.navigate('Main')
      } else {
        alert('Invalid email or password. Please try again.')
      }
    } catch (e) {
      console.error('Failed to retrieve data from storage', e)
      alert('An error occurred while trying to log in.')
    }
  }

  return (
    <SafeAreaView
      style={{ backgroundColor: '#330169' }}
      className="flex-1 bg-black p-4 text-white"
    >
      <StatusBar barStyle="light-content" backgroundColor="##330169" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            backgroundColor: '#330169',
            alignItems: 'center',
          }}
          className="flex-1"
        >
          <Image
            source={require('../../assets/images/IconGameThink.png')}
            style={styles.image}
            resizeMode="contain"
          />
          <View className="mb-6">
            <Text className="text-3xl font-bold text-purple-600 mb-4">
              For members
            </Text>
          </View>

          <Formik
            initialValues={{
              email: '',
              password: '',
              agreement: false,
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({
              handleChange,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue,
            }) => (
              <View className="px-4">
                <View className="mb-4">
                  <Text className="text-lg font-medium text-white mb-2">
                    Email
                  </Text>
                  <TextInput
                    placeholder="Write your email here!"
                    placeholderTextColor="#A0A0B4"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    className="border border-white rounded-lg px-4 py-2 text-lg text-white"
                  />
                  {touched.email && errors.email && (
                    <Text className="text-red-500 mt-1">{errors.email}</Text>
                  )}
                </View>

                <View className="mb-4">
                  <Text className="text-lg font-medium text-white mb-2">
                    Password
                  </Text>
                  <TextInput
                    placeholder="Write your password here"
                    placeholderTextColor="#A0A0B4"
                    value={values.password}
                    onChangeText={handleChange('password')}
                    secureTextEntry
                    className="border border-gray-300 rounded-lg px-4 py-2 text-lg text-white"
                  />
                  {touched.password && errors.password && (
                    <Text className="text-red-500 mt-1">{errors.password}</Text>
                  )}
                </View>

                <View className="flex-row items-center mb-4">
                  <TouchableOpacity
                    onPress={() =>
                      setFieldValue('agreement', !values.agreement)
                    }
                    className="w-6 h-6 border border-gray-300 rounded-md mr-2 justify-center items-center"
                  >
                    {values.agreement && (
                      <View className="w-4 h-4 bg-purple-500 rounded-md" />
                    )}
                  </TouchableOpacity>
                  <Text className="text-lg text-purple-300">
                    I agree to the terms and conditions
                  </Text>
                </View>
                {touched.agreement && errors.agreement && (
                  <Text className="text-red-500 mt-1">{errors.agreement}</Text>
                )}

                <View className="mt-4">
                  <Button title="Sign In" onPress={handleSubmit} />
                </View>

                <View className="mt-4 items-center">
                  <Text className="text-lg text-purple-300">Not a member?</Text>
                  <Button
                    title="Sign Up"
                    onPress={() => props.navigation.navigate('SignUp')}
                  />
                </View>
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  // container: {
  //   backgroundColor: '#330169',
  // },
  // textColor: {
  //   color: 'white',
  //   textTransform: 'uppercase',
  // },

  image: {
    width: 150,
    height: 150,
    borderRadius: '50%',
  },
})
