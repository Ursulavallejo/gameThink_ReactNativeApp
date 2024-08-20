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
    width: 120,
    height: 135,
    padding: 12,
    marginRight: 16,
    borderWidth: 4,
    backgroundColor: '#FFFFFF',
    borderColor: '#9333EA',
    borderRadius: 12,
    alignItems: 'center',
  },
  title: {
    width: '100%',
    paddingTop: 8,
    // backgroundColor: 'red',
    alignItems: 'center',
  },
})
