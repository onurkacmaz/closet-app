import { Alert, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Item from '../../components/Item'
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import ClosetApi from '../../store/Closet';
import ItemApi from '../../store/Item';
import Loader from '../../components/Loader'

const ClosetDetailScreen = ({route}) => {
  
  const scrollRef = useRef();
  const navigation = useNavigation()
  const [closet, setCloset] = useState(route?.params?.closet ?? {})
  const [loading, setLoading] = useState(false)

  useLayoutEffect(() => {
    navigation.setOptions({
      title: closet.name,
      headerRight: () => (
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity onPress={() => handleTabActions()} style={{paddingLeft:20}}>
            <Icon type='font-awesome' size={20} color="#FFBD35" name='ellipsis-v'></Icon>
          </TouchableOpacity>
        </View>
      ),
    })
  })
  
  useEffect(() => {
    const refresh = navigation.addListener('focus', () => {
      onRefresh()
    });

    return () => {;
      refresh;
    };
  }, [navigation]);

  const handleTabActions = () => {
    Alert.alert('Actions', null, [
      {
        text: "Edit", 
        onPress: () => {
          navigation.navigate('ClosetEditScreen', {closet:closet})
        }
      },
      {
        text: "Delete", 
        style:'destructive',
        onPress: () => {
          ClosetApi.delete(closet.id).then(r => {
            if(r.status == 204) { 
              navigation.goBack()
            }
          })
        }
      },
      {
        cancelable: true,
        text: "Cancel",
        style: "cancel"
      }
    ]);
  }

  const onRefresh = () => {
    setLoading(true)
    ClosetApi.get(closet.id).then(r => {
      setCloset(r.data.data)
    }).finally(() => {
      setLoading(false)
    })
  }

  const navigateItemDetailScreen = (item) => {
    item.closet = closet;
    navigation.navigate('ItemDetailScreen', {item:item})
  }

  const handleActions = (item) => {
		Alert.alert('Actions', null, [
      {
        text: "Edit", 
        onPress: () => {
          navigation.navigate('ItemEditScreen', {item:item, redirectScreen: () => navigation.goBack()})
        }
      },
      {
        text: "Delete", 
        style:'destructive',
        onPress: () => {
					ItemApi.delete(item.id).then(r => {
            onRefresh()
					})
        }
      },
      {
        cancelable: true,
        text: "Cancel",
        style: "cancel"
      }
    ]);
	}

  const navigateNewItemScreen = () => {
    navigation.navigate("ItemEditScreen", {
      item: {
        closet: closet
      },
      isNew: true
    })
  }

  const { width } = Dimensions.get('window');
  
  return (
    <ScrollView style={styles.container} ref={scrollRef}>
      <Loader animating={loading}/>
      <View>
        <Text style={{fontWeight:'700', fontSize:25}}>{closet.name}</Text>
        <Text style={{marginTop:10, fontWeight:'500', color:'#999', fontSize:15}}>{closet.description}</Text>
      </View>
      <View style={{marginTop:20}}>
        <Text style={{fontWeight:'700', fontSize:25}}>
        {Object.keys(closet.items).length} Items
        </Text>
        <View style={{width:width, marginTop:5, flex:1, flexDirection:'row', flexWrap:'wrap'}}>
        {
          closet.items.map(item => {
            return (
              <TouchableOpacity key={item.id} onPress={() => navigateItemDetailScreen(item)} onLongPress={() => handleActions(item)}>
                <Item enableOnLongPress={true} item={item} />
              </TouchableOpacity>
            )
          })
        }
          <TouchableOpacity onPress={() => navigateNewItemScreen()} style={{marginRight:10, justifyContent:'center', backgroundColor:'#ccc', width:((width - 50) / 4), height:100, borderRadius:5}}>
            <Icon type='font-awesome' color={"#fff"} name='plus-circle' size={40}/>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

export default ClosetDetailScreen

const styles = StyleSheet.create({
  container: {
    margin:10
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
})