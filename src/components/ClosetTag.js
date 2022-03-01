import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements/dist/icons/Icon';

const ClosetTag = (props) => {

  return (
    <View style={styles.tag}>
      <Text style={styles.text}>{props.closetName}</Text>
      {/**<Icon style={{marginLeft: 5}} color="#fff" name='times' size={15} type='font-awesome' ></Icon>*/}
    </View>
  )
}

export default ClosetTag

const styles = StyleSheet.create({
  tag: {
    flexDirection:'row',
    marginBottom:5,
    marginRight:5,
    padding:10,
    backgroundColor:'#9C51E0',
    borderRadius:10,
    borderWidth:1,
    borderColor:'#8A39E1'
  },
  text: {
    fontWeight:'700',
    color:'#fff',
    fontSize:15
  }
})