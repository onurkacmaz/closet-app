import { Dimensions, Image, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import Config from '../store/Config';

const Item = (props) => {

	const {item} = props

  const { width } = Dimensions.get('window');

  return (
    <View style={[styles.box, {width: ((width - 50) / 4)}]}>
			<Image style={{borderRadius:5, height:100, flex:1, resizeMode:'cover'}} source={{
				uri: Config.domain + item.photos[0]?.url,
				height: 100,
				width: '100%'
			}} />
    </View>
  )
}

export default Item

const styles = StyleSheet.create({
	box: {
		shadowColor: "#222",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.20,
		shadowRadius: 1.41,
		elevation: 1, 
		marginRight:10,
		marginBottom:10,
		borderRadius:5,
		backgroundColor:'#fff', 
	}
})