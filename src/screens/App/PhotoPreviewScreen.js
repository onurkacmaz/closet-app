import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Icon } from 'react-native-elements';

const PhotoPreviewScreen = ({route}) => {

  const navigation = useNavigation();
  const [photo, setPhoto] = useState(route.params.photo)

  navigation.setOptions({
    header:() => {},
  })

  return (
    <View>
      <Image style={{resizeMode:'cover'}} source={{uri: `data:image/jpg;base64,${photo.base64}`, width: '100%', height:'100%'}}/>
      <View style={{flexDirection:'row', justifyContent:'space-between', position:'absolute', bottom:0, width:'100%', padding:20}}>
        <Text style={{color:'#fff', fontWeight:'700', fontSize:20}}>
          <Icon type='font-awesome' name='times' color={"#fff"}></Icon>
        </Text>
        <Text style={{color:'#fff', fontWeight:'700', fontSize:20}}>
          <Icon type='font-awesome' name='check' color={"#fff"}></Icon>
        </Text>
      </View>
    </View>
  )
}

export default PhotoPreviewScreen

const styles = StyleSheet.create({})