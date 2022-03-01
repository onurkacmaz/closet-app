import { Dimensions, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Config from '../store/Config'

const ItemPhoto = (props) => {

  const { width } = Dimensions.get('window');

	const getImageUri = () => {
		if(props.item.url) {
			return Config.domain + props.item.url
		}
		return `data:image/jpeg;base64,${props.item.base64}`
	}
  return (
    <TouchableOpacity onPress={props.onPress} style={[styles.box, {width: ((width - 70) / 4)}]}>
			<Image style={[{borderRadius:5, resizeMode:'cover'}]} source={{
				uri: getImageUri(),
				height: 100,
				width: '100%' 
			}} />
    </TouchableOpacity>
  )
}

export default ItemPhoto

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