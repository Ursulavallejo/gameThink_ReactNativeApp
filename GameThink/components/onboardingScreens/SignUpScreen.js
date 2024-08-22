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
  // TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
} from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'

export function SignUpScreen(props) {
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('user-signup-data', jsonValue)
      alert('Data saved successfully!')
    } catch (e) {
      alert('Failed to save the data to the storage')
      console.error(e)
    }
  }

  // Validation schema with Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(4, 'Name must be at least 4 characters')
      .required('Name is required'),
    birthday: Yup.string().required('Date of birth is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmationPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  })

  function onSubmit(values) {
    if (values.password !== values.confirmationPassword) {
      alert('Passwords do not match, please try again.')
    } else {
      storeData(values) // Store the data when the form is successfully submitted
      alert(`Signed up with email: ${values.email}`)
      props.navigation.navigate('SignIn')
    }
  }

  return (
    <SafeAreaView
      style={{ backgroundColor: '#330169' }}
      className="flex-1 bg-black p-4 text-white"
    >
      <StatusBar barStyle="light-content" backgroundColor="#330169" />
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
              Join Us
            </Text>
          </View>

          <Formik
            initialValues={{
              name: '',
              birthday: '',
              email: '',
              password: '',
              confirmationPassword: '',
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
              <View className="px-4 w-full max-w-md">
                <InputWithLabel
                  label="Name"
                  placeholder="Write your name here"
                  value={values.name}
                  onChangeText={handleChange('name')}
                  error={touched.name && errors.name}
                />

                <InputWithLabel
                  label="Date of Birth"
                  placeholder="Write your date of birth here"
                  value={values.birthday}
                  onChangeText={handleChange('birthday')}
                  error={touched.birthday && errors.birthday}
                />

                <InputWithLabel
                  label="Email"
                  placeholder="Write your email here!"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  error={touched.email && errors.email}
                />

                <InputWithLabel
                  label="Password"
                  placeholder="Write your password here"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  secureTextEntry
                  error={touched.password && errors.password}
                />

                <InputWithLabel
                  label="Confirm Password"
                  placeholder="Confirm your password here"
                  value={values.confirmationPassword}
                  onChangeText={handleChange('confirmationPassword')}
                  secureTextEntry
                  error={
                    touched.confirmationPassword && errors.confirmationPassword
                  }
                />

                <View className="mt-6">
                  <Button title="Submit" onPress={handleSubmit} />
                </View>

                <View className="mt-4">
                  <Button
                    title="Continue"
                    onPress={() => props.navigation.navigate('Main')}
                  />
                </View>

                <View className="mt-4 items-center">
                  <Text className="text-lg text-purple-300">
                    Already a member?
                  </Text>
                  <Button
                    title="Sign In"
                    onPress={() => props.navigation.navigate('SignIn')}
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

function InputWithLabel(props) {
  const { label, placeholder, value, onChangeText, secureTextEntry, error } =
    props

  return (
    <View className="mb-4">
      <Text className="text-lg font-medium text-white mb-2">{label}</Text>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        className="border border-white rounded-lg px-4 py-2 text-lg"
        placeholderTextColor="#aaa"
      />
      {error && <Text className="text-red-500 mt-1">{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
})
