// import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Button } from 'react-native'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// --- Onboarding screens ---
import { SignInScreen } from './components/onboardingScreens/SignInScreen'
import { SignUpScreen } from './components/onboardingScreens/SignUpScreen'

// --- Main screens ---

import { HomeScreen } from './components/mainScreens/HomeScreen'

// --- Icons ---
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

// --- Navigation types ---
const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

// --- Main screens ---

// const HomeScreen = () => {
//   return (
//     <View style={styles.layout}>
//       <Text style={styles.title}>Home Screen</Text>
//     </View>
//   )
// }
const FeedScreen = () => {
  return (
    <View style={styles.layout}>
      <Text style={styles.title}>Feed Screen</Text>
    </View>
  )
}
const CatalogScreen = () => {
  return (
    <View style={styles.layout}>
      <Text style={styles.title}>Catalog Screen</Text>
    </View>
  )
}
const AccountScreen = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.layout}>
      <Text style={styles.title}>Account Screen </Text>
      <Button title="Log Out" onPress={() => navigation.navigate('SignIn')} />
    </View>
  )
}

const MainNavigator = () => {
  return (
    // MaterailIcons>>

    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home'
          } else if (route.name === 'Feed') {
            iconName = focused ? 'rss-feed' : 'rss-feed'
          } else if (route.name === 'Catalog') {
            iconName = focused ? 'view-list' : 'view-list'
          } else if (route.name === 'Account') {
            iconName = focused ? 'account-circle' : 'account-circle'
          }

          // Retorna un ícono de MaterialIcons
          return <MaterialIcons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Catalog" component={CatalogScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  )
}

// --- App ---

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Main" component={MainNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})
