import { StyleSheet, StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// import { StatusBar } from 'expo-status-bar'
import * as SplashScreen from 'expo-splash-screen'

// --- Onboarding screens ---
import { SignInScreen } from './components/onboardingScreens/SignInScreen'
import { SignUpScreen } from './components/onboardingScreens/SignUpScreen'

// --- Main screens ---

import { HomeScreen } from './components/mainScreens/HomeScreen'
import { FeedScreen } from './components/mainScreens/FeedScreen'
import { CatalogScreen } from './components/mainScreens/CatalogScreen'
import { AccountScreen } from './components/mainScreens/AccountScreen'

// --- Icons ---
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { SafeAreaProvider } from 'react-native-safe-area-context'
// import { SafeAreaView } from 'react-native-safe-area-context'

// --- Navigation types ---
const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

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

          // Returns Icon >> MaterialIcons
          return <MaterialIcons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: 'purple',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#FCDF03',
        },
        headerStyle: {
          backgroundColor: '#330169',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Catalog" component={CatalogScreen} />
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  )
}

// --- App ---

export default function App() {
  SplashScreen.preventAutoHideAsync()
  setTimeout(SplashScreen.hideAsync, 3000)
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Main" component={MainNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
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
