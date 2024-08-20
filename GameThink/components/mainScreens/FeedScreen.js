import { Text, View } from 'react-native'
import { useEffect, useState } from 'react'
import { globalStyles } from '../../styles/globalStyles'
// import { Card } from '../Card'
import { Heading } from '../BasicReusableComponents'

export function FeedScreen() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch(
      'https://raw.githubusercontent.com/Ursulavallejo/gameThink_ReactNativeApp/main/GameThink/data/users.json'
    )
      .then((response) => response.json())
      .then((result) => {
        setUsers(result)
      })
  })

  return (
    <View style={globalStyles.layout}>
      <Heading>We Go Further Together!!</Heading>
      {/* <Text style={globalStyles.title}>Feed!</Text> */}

      {/* print all the Api */}
      <Text>{JSON.stringify(users)}</Text>
      {/* <Card></Card> */}
    </View>
  )
}
