import { StyleSheet, View } from 'react-native'

import { ImageProfile, Title } from './BasicReusableComponents'

export const Card = (props) => (
  <View style={cardStyles.card}>
    <ImageProfile url={props.imageProfile} />
    <View style={cardStyles.title}>
      <Title>{props.name}</Title>
    </View>
  </View>
)

const cardStyles = StyleSheet.create({
  card: {
    width: 88,
    height: 112,
    padding: 12,
    marginRight: 16,
    borderWidth: 2,
    backgroundColor: '#FFFFFF',
    borderColor: '#E7E3EB',
    borderRadius: 12,
  },
  title: {
    width: '100%',
    paddingTop: 8,
    // backgroundColor: 'red',
    alignItems: 'center',
  },
})
