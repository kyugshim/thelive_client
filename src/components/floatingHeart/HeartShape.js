import React from 'react'
import { Image } from 'react-native'

export default class HeartShape extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <Image source={require('../../images/ico_heart.png')} style={{ width: 25, height: 25 }} />
  }
}
