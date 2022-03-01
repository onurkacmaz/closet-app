import { FlatList, TouchableOpacity, StyleSheet, Text, View, Alert, TextInput, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { Icon } from 'react-native-elements';
import ClosetApi from '../../store/Closet';
import Loader from '../../components/Loader'

const MyClosetsScreen = ({navigation, route}) => {

  const [closets, setClosets] = useState([])
  const [q, setQ] = useState(null);
  const [loading, setLoading] = useState(false)

  const deleteCloset = (closet) => {
    Alert.alert('Are you sure?', 'Are you sure you want to delete this closet?', [
      { 
        text: "Delete",
        style: "default",
        onPress: () => {
          ClosetApi.delete(closet.id).then(r => {
            setLoading(true)
            onRefresh().finally(() => {
              setLoading(false)
            })
          })
        }
      },
      {
        cancelable: true,
        text: "Cancel",
        style: "destructive"
      },
    ])
  }

  const handleActions = (closet) => {
    Alert.alert('Actions', null, [
      { 
        text: "Delete",
        style: "destructive",
        onPress: () => deleteCloset(closet)
      },
      {
        cancelable: true,
        text: "Cancel",
        style: "cancel"
      },
    ])
  }

  const navigateClosetDetailScreen = (closet) => {
    navigation.navigate("ClosetDetailScreen", {closet:closet})
  }

  const renderCloset = ({item}) => {
    return (
      <TouchableOpacity onPress={() => navigateClosetDetailScreen(item)} onLongPress={() => handleActions(item)} style={styles.item}>
        <Text style={styles.itemText}>{item.name} - </Text>
        <Text style={{alignSelf:'center', color:'#999', fontSize:13}}>{Object.keys(item.items ?? []).length} items</Text>
      </TouchableOpacity>
    )
  }

  const navigateClosetAddScreen = () => {
    navigation.navigate('ClosetEditScreen', {closet:{}})
  }

  const onRefresh = async () => {
    return await ClosetApi.all(q).then(r => {
      setClosets(r.data.data)
    })
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Closets',
      headerRight: () => (
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity onPress={() => navigateClosetAddScreen()}>
            <Icon type='font-awesome' size={20} color="#95CD41" name='plus-circle'></Icon>
          </TouchableOpacity>
        </View>
      ),
    })
  })

  useEffect(() => {
    const refresh = navigation.addListener('focus', () => {
      setLoading(true)
      onRefresh().finally(() => {
        setLoading(false)
      })
    });
    onRefresh()
    return () => {
      refresh;
    };
  }, [q]);

  const GetClosets = () => {
    if(Object.keys(closets).length <= 0) {
      return (
        <View style={{marginTop:20, justifyContent:'center', alignItems:'center'}}>
          <Text style={{fontSize:20, fontWeight:'600', color:'#999'}}>You dont have any closets</Text>
        </View>
      )
    }else {
      return (
        <FlatList style={styles.container} data={closets} renderItem={renderCloset} />
      )
    }
  }

  return (
    <View style={{flex:1, backgroundColor:'#fff'}}>
      <Loader animating={loading}/>
      <View style={{}}>
        <TextInput placeholder='Search' placeholderTextColor={"#999"} onChangeText={q => setQ(q)} style={{ backgroundColor:'#fafbfb', padding:15, borderBottomWidth:1, borderBottomColor:'#ccc'}} />
      </View> 
      <GetClosets />
    </View>
  )
}

export default MyClosetsScreen

const styles = StyleSheet.create({
  container: { 
    borderBottomLeftRadius:0,
    borderBottomRightRadius:0
  },
  item: {
    flexDirection:'row',
    padding:20,
    paddingHorizontal:15,
    borderBottomWidth:1,
    borderBottomColor:'#DFDFDF',
    backgroundColor:'#fff'
  },
  itemText: {
    color:'#666',
    fontWeight:'800',
    fontSize:17
  }
})