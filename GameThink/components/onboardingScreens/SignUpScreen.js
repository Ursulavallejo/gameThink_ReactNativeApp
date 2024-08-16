import React from 'react'
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup' // Import Yup

export function SignUpScreen(props) {
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
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inner}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        >
          <View className="mb-6">
            <Text className="text-3xl font-bold text-purple-600 mb-4">
              Sign Up Screen
            </Text>
            <Button
              title="Continue"
              onPress={() => props.navigation.navigate('Main')}
            />
          </View>

          <Formik
            initialValues={{
              email: '',
              password: '',
              confirmationPassword: '',
              name: '',
              birthday: '',
            }}
            validationSchema={validationSchema} // Apply validation schema
            onSubmit={onSubmit}
          >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
              <View>
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
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

function InputWithLabel(props) {
  const {
    label,
    placeholder,
    value,
    onChangeText,
    secureTextEntry,
    onSubmitEditing,
    error,
  } = props

  return (
    <View className="mb-4">
      <Text className="text-lg font-medium text-gray-700 mb-2">{label}</Text>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        onSubmitEditing={onSubmitEditing}
        className="border border-gray-300 rounded-lg px-4 py-2 text-lg"
      />
      {error && <Text className="text-red-500 mt-1">{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inner: {
    padding: 16,
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
})
