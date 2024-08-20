import { Text, View, Image, StyleSheet } from 'react-native'
import { Heading, Title } from '../BasicReusableComponents'
import { globalStyles } from '../../styles/globalStyles'

export function HomeScreen() {
  return (
    <View style={[globalStyles.layout, styles.container]}>
      <Heading>slides animation?</Heading>

      <Image
        source={require('../../assets/images/HomeAppGame.jpg')}
        style={styles.image}
        resizeMode="contain"
      />

      {/* <View style={styles.textContainer}>
        <Text style={[globalStyles.title, styles.textColor]}>
          We Go Further Together
        </Text>
      </View> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#330169',
    alignItems: 'center',
    // justifyContent: 'center',
  },

  textContainer: {
    position: 'absolute', // Ensures the text is positioned over the image
    // top: '50%',
    // left: '50%',
    // transform: [{ translateX: -100 }, { translateY: -50 }],
  },
  textColor: {
    color: 'white',
    textTransform: 'uppercase',
  },

  image: {
    width: '80%',
    height: '100%',
    borderRadius: '50%',
  },
})
