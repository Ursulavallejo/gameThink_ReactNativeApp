import {
  Image,
  // SafeAreaView,
  // ScrollView,
  StyleSheet,
  Text,
  View,
  // FlatList,
} from 'react-native'

//FEED Screen Users>>>

export const ImageProfile = (props) => (
  <Image style={styles.imageProfile} source={{ uri: props.url }} />
)

export const Heading = (props) => (
  <Text style={styles.heading}>{props.children}</Text>
)

export const Title = (props) => (
  <Text style={[styles.title, props.style]}>{props.children}</Text>
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

    // color: 'red',
  },
})

//FEED Screen POSTS>>>

export const Post = (props) => (
  <View style={PostStyles.layout}>
    <Image source={{ uri: props.image }} style={PostStyles.image} />
    <View style={PostStyles.content}>
      <Text style={PostStyles.title}>{props.title}</Text>

      <Text
        style={PostStyles.description}
        // If i want to see only a few lines
        // numberOfLines={3}
      >
        {props.description}
      </Text>
      <Text style={{ color: 'yellow' }}>Author:</Text>

      {/* WHY Cant pass styles if is a component */}
      <Title style={{ color: 'red' }}>{props.author}</Title>
    </View>
  </View>
)

const PostStyles = StyleSheet.create({
  layout: {
    marginHorizontal: 24,

    flexDirection: 'row',
    marginVertical: 8,
    borderWidth: 1,
    backgroundColor: 'transparent',
    borderColor: '#9333EA',
    borderRadius: 12,
    padding: 3,

    width: '90%',
  },
  image: {
    borderRadius: 12,
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 12,
  },
  title: {
    color: 'pink',
    fontWeight: '600',
  },
  description: {
    fontSize: 12,
    marginTop: 4,
    color: 'white',
  },
})
