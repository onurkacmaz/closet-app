import { StyleSheet, Text, ScrollView, TouchableOpacity, Image, View } from 'react-native'
import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AuthContext } from '../../components/context'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import BottomSheet from "react-native-gesture-bottom-sheet";
import Loader from '../../components/Loader'
import AccountApi from '../../store/Account' 
import Config from '../../store/Config';
import Constants from 'expo-constants';

const ProfileScreen = ({route, navigation}) => {
 
  const { signOut, getUser } = useContext(AuthContext)
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(false)
  
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

  const updateProfilePicture = (photo) => {
    getUser().then(r => {
      let data = JSON.parse(r)
      AccountApi.updateProfilePicture(data.id, photo.base64)
      .then(r => {

        console.log(r.data.url);
        let u = user
        u.photo = r.data.url
        setUser(u)
      })
    })
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      header:() => {}
    })
    navigation.addListener('focus', () => {
      if (route.params != undefined && route.params.capturedPhotos != undefined) {
        updateProfilePicture(route.params.capturedPhotos[0])
      }
      onRefresh()
    });
  })

  useEffect(() => {
    onRefresh()
  }, [])
    
  const bottomSheetData = [
    {
      label: 'Update Profile Picture',
      onPress: () => {
        bottomSheet.current.close()
        navigation.navigate("CameraScreen", {
          maxPhotosCount: 1,
          targetScreen: 'ProfileScreen'
        })
      }
    },
    {
      label: 'Account Settings',
      onPress: () => {
        bottomSheet.current.close()
        navigation.navigate("AccountEditScreen")
      }
    },
    {
      label: 'Cancel',
      onPress: () => {
        bottomSheet.current.close()
      },
      textStyle: { 
        color:'#fff'
      },
      itemStyle: {
        backgroundColor:'#D82148'
      }
    }
  ]

  const bottomSheet = useRef();

  return (
    <View style={{flex:1}}>
      <Loader animating={loading} />
      <BottomSheet radius={10} ref={bottomSheet} height={200}>
      <View>
        {
          bottomSheetData.map((item, key) => {
            return (
              <TouchableOpacity key={key} style={[item.itemStyle, {padding:20, borderBottomWidth:1, borderColor:'#E0E0E0'}]} onPress={item.onPress}>
                <Text style={[{fontWeight:'700', color:'#333'}, item.textStyle]}>{item.label}</Text>
              </TouchableOpacity>
            )
          })
        }
      </View>
      </BottomSheet>
      <TouchableOpacity onPress={() => bottomSheet.current.show()} style={{paddingTop:Constants.statusBarHeight, marginBottom:10, flexDirection:'row', padding:20, backgroundColor:'#fff', borderBottomWidth:1, borderColor:'#E7E7E7'}}>
        <View>
          <Image style={{borderRadius:100, resizeMode:'cover'}} source={{uri: Config.domain + user.photo, height:100, width:100}}></Image>
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