import {
  Image,
  // SafeAreaView,
  // ScrollView,
  StyleSheet,
  Text,
  // View,
  // FlatList,
} from 'react-native'

//FEED Screen >>>

export const ImageProfile = (props) => (
  <Image style={styles.imageProfile} source={{ uri: props.url }} />
)

export const Heading = (props) => (
  <Text style={styles.heading}>{props.children}</Text>
)

export const Title = (props) => (
  <Text style={styles.title}>{props.children}</Text>
)

const styles = StyleSheet.create({
  imageProfile: {
    height: 74,
    width: 74,
    borderRadius: '50%',
  },
  heading: {
    fontFamily: 'Helvetica',
    fontSize: 20,
    fontWeight: '600',
    paddingTop: 20,
    paddingBottom: 12,
    paddingHorizontal: 24,
    color: 'white',
  },
  title: {
    fontFamily: 'Helvetica',
    fontSize: 12,
    textTransform: 'uppercase',
    fontWeight: '600',
    color: '#280D5F',
  },
})
