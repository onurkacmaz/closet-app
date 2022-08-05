import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements'
import Config from '../store/Config'

const Card = (props) => {

  let combine = props.combine
  let user = combine.user
  let combineItems = combine.combine_items

  return (
    <View style={styles.card}>
      <View style={styles.userImageContainer}>
        <Image style={styles.userImage} source={{uri: Config.domain + user?.photo, width:40, height:40}} />
      </View>
      <View style={styles.cardImages}>
      {
        combineItems.map((combineItem, i) => {
          if(i <= 2) {
            return (
              <Image key={i} style={[styles.cardImage, i == 1 ? {borderTopRightRadius:10} : null]} source={{uri: Config.domain + combineItem.item?.photos[0].url, width:'50%', height:80}} />
            )
          }
          if(i == 3) {
            return (
              <View key={i} style={{width:'50%'}}>
                <Image style={styles.cardImage} source={{uri: Config.domain + combineItem.item.photos[0].url, width:'100%', height:80}}/>
                <View style={{backgroundColor:'rgba(0,0,0,0.6)', position:'absolute', width:'100%', height:'100%', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                  <Icon type="font-awesome" name='plus-circle' size={30} color="#ccc" />
                  <Text style={{marginLeft:5, color:'#fff', fontWeight:'900'}}>{Object.keys(combineItems).length - 4}</Text>
                </View>
              </View>
            )
          } 
        })
      }
      </View>
      <View style={styles.cardContent}>
        <TouchableOpacity style={styles.cardAction}>
          <Icon type='font-awesome' size={20} name="reply" color={"#2FA4FF"}></Icon>
          <Text style={{marginLeft:10, fontWeight:'900'}}>10</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardAction}>
          <Icon type='font-awesome' size={20} name="heart" color={"#FF1818"}></Icon>
          <Text style={{marginLeft:10, fontWeight:'900'}}>50</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Card

const styles = StyleSheet.create({
  userImageContainer: {
    position:'absolute',
    zIndex:101,
    top:-10,
    right:-5,
    padding:3,
    backgroundColor:'#333',
    borderRadius:100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  },
  userImage: {
    borderRadius:100
  },
  card: {
    width:'100%',
    backgroundColor:'#fff',
    borderRadius:10
  },
  cardContainer: {
    paddingHorizontal:20,
    paddingVertical:20,
  },
  cardImages: {
    flexWrap:'wrap',
    flexDirection:'row'
  },
  cardImage: {
    resizeMode:'cover'
  },
  cardHeadText: {
    fontWeight:'700',
    fontSize:15,
    padding:10
  },
  cardContent: {
    flexDirection: 'row',
    flexWrap:'wrap'
  },
  cardAction: {
    flexDirection:'row',
    padding:15,
    width:'50%',
    justifyContent:'center',
    alignItems:'center'
  }
})