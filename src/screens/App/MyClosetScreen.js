import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Item from '../../components/Item' 
import { useNavigation } from '@react-navigation/native'
import { Icon } from 'react-native-elements/dist/icons/Icon'

const MyClosetScreen = () => {

  const navigation = useNavigation();
  let recentlyViewedItems = []

  const navigateMyClosetsScreen = () => {
    navigation.navigate('MyClosetsScreen')
  }

  return (
    <View style={{flex:1}}>
      <View style = {[styles.container, {marginTop:5}]}>
        <View style={{width:'50%', padding:5}}>
          <TouchableOpacity onPress={() => navigateMyClosetsScreen()} style={{justifyContent:'center', alignItems:'center', padding:20, borderRadius:5, backgroundColor:'#FFBD35'}}>
            <Text style={{color:'#fff', fontWeight:'900', fontSize:17}}>
              <Icon size={15} style={{marginRight:5}} color="#fff" name='star' type='font-awesome'></Icon>
              MY CLOSETS
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{width:'50%', padding:5}}>
          <TouchableOpacity onPress={() => navigateMyClosetsScreen()} style={{justifyContent:'center', alignItems:'center', padding:20, borderRadius:5, backgroundColor:'#FF5C8D'}}>
            <Text style={{color:'#fff', fontWeight:'900', fontSize:17}}>
              <Icon size={15} style={{marginRight:5}} color="#fff" name='heart' type='font-awesome'></Icon>
              FAVORITES
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style = {[styles.container]}>
        <View style={{width:'50%', padding:5}}>
          <TouchableOpacity onPress={() => navigateMyClosetsScreen()} style={{justifyContent:'center', alignItems:'center', padding:20, borderRadius:5, backgroundColor:'#90E0EF'}}>
            <Text style={{color:'#fff', fontWeight:'900', fontSize:15}}>
              <Icon size={15} style={{marginRight:5}} color="#fff" name='history' type='font-awesome'></Icon>
              MY COMBINES
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{width:'50%', padding:5}}>
          <TouchableOpacity onPress={() => navigateMyClosetsScreen()} style={{justifyContent:'center', alignItems:'center', padding:20, borderRadius:5, backgroundColor:'#B667F1'}}>
            <Text style={{color:'#fff', fontWeight:'900', fontSize:17}}>
              <Icon size={15} style={{marginRight:5}} color="#fff" name='search' type='font-awesome'></Icon>
              SEARCH
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default MyClosetScreen

const styles = StyleSheet.create({
  container: {
    marginLeft:5,
    marginRight:5,
    flexWrap:'wrap',
    flexDirection: 'row',
 }
})