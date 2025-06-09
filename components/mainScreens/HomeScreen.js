import { Text, View, StyleSheet } from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider'
import LottieView from 'lottie-react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

// const { width } = Dimensions.get('window')

const slides = [
  {
    key: '1',
    title: 'Welcome to Our Community!',
    text: 'Let’s connect with others!',
    image: require('../../assets/lottie/animation1.json'),
  },
  {
    key: '2',
    title: 'Discover Amazing Friends!',
    text: 'We go further together!',
    image: require('../../assets/lottie/animation2.json'),
  },

  {
    key: '3',
    title: 'We go further together!',
    text: 'Let´s Start!!',
    image: require('../../assets/lottie/animation3.json'),
  },
]

export function HomeScreen() {
  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <LottieView source={item.image} autoPlay loop style={styles.animation} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    </View>
  )

  const renderNextButton = () => (
    <View style={styles.buttonCircle}>
      <Icon name="arrow-forward" color="rgba(255, 255, 255, .9)" size={24} />
    </View>
  )

  const renderDoneButton = () => (
    <View style={styles.buttonCircle}>
      <Icon name="check" color="rgba(255, 255, 255, .9)" size={24} />
    </View>
  )

  return (
    <AppIntroSlider
      style={styles.container}
      renderItem={renderItem}
      data={slides}
      dotStyle={styles.dot}
      activeDotStyle={styles.activeDot}
      paginationStyle={styles.pagination}
      renderNextButton={renderNextButton}
      renderDoneButton={renderDoneButton}
      showSkip={false}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#330169',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  animation: {
    flex: 1,
    width: '100%',
    height: '70%',
    alignSelf: 'center',
  },
  title: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },

  text: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
    // fontWeight: 'bold',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  dot: {
    backgroundColor: 'rgba(255,255,255,.5)',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: '#fff',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  pagination: {
    bottom: 20,
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
