import { StyleSheet, Text, ScrollView, TouchableOpacity, Image, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../components/context'
import { Icon } from 'react-native-elements/dist/icons/Icon'

const ProfileScreen = ({route, navigation}) => {

  const { signOut, getUser } = useContext(AuthContext)
  const [user, setUser] = useState({})
  
  const items = [
    {
      icon: {
        name: 'user',
      },
      title: 'Account',
      onPress: () => {
        navigation.navigate('AccountEditScreen')
      }
    },
    {

      icon: {
        name: 'sign-out',
      },
      title: 'Logout',
      onPress: () => {
        signOut()
      }
    }
  ]

  const onRefresh = () => {
    getUser().then(data => {
      setUser(JSON.parse(data))
    })
  }

  navigation.addListener('focus', () => {
    onRefresh()
  });

  useEffect(() => {
    onRefresh()
  }, [])

  return (
      <View style={{flex:1}}>
        <TouchableOpacity style={{marginBottom:10, flexDirection:'row', padding:20, backgroundColor:'#fff', borderBottomWidth:1, borderColor:'#E7E7E7'}}>
          <View>
            <Image style={{borderRadius:100, resizeMode:'cover'}} source={{uri: 'https://pbs.twimg.com/profile_images/1490793553223725067/5BYNuOBv_400x400.jpg', height:100, width:100}}></Image>
          </View>
          <View style={{marginLeft:20, justifyContent:'center', flex:1}}>
            <Text style={{fontWeight:'600', fontSize:25}}>{user.name}</Text>
          </View>
        </TouchableOpacity>
        <ScrollView>
          {
            items.map((item, i) => {
              return (
                <TouchableOpacity onPress={item.onPress} key={i} style={styles.item}>
                  <Icon width={20} type='font-awesome' name={item.icon.name} size={17} color={"#555"}></Icon>
                  <Text style={{marginLeft:5, fontWeight:'500', color:'#333', fontSize:15}}>{item.title}</Text>
                </TouchableOpacity>
              )
            })
          }
        </ScrollView>
      </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  item: {flexDirection:'row', alignItems:'center', paddingVertical:15, paddingHorizontal:20, backgroundColor:'#fff', borderBottomWidth:1, borderColor:'#E7E7E7'}
})