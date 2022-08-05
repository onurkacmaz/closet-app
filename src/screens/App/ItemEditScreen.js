import { Alert, Dimensions, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import ItemPhoto from '../../components/ItemPhoto'
import { Icon } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ItemApi from '../../store/Item';
import Loader from '../../components/Loader'


const ItemEditScreen = ({route, navigation}) => {

  const MAX_PHOTOS = 8
  const [item, setItem] = useState(route.params.item);
  const [name, setName] = useState();
  const [note, setNote] = useState();
  const [photos, setPhotos] = useState([{}]);
  const [loading, setLoading] = useState(false);

  const { width } = Dimensions.get('window');
  const [isNew, setIsNew] = useState(route.params.isNew ?? false)

  useEffect(() => {
    let item = route.params.item;
    setItem(item)
    setName(item?.name)
    setNote(item?.note)
    setPhotos(item.photos ?? [])
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isNew ? 'New Item' : 'Update Item',
      headerRight: () => (
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity onPress={() => saveItem()}>
            <Icon type='font-awesome5' size={20} color="#95CD41" name='save'></Icon>
          </TouchableOpacity>
        </View>
      ),
    })
    
    navigation.addListener('focus', () => {
      if(route.params.capturedPhotos != undefined) {
        setPhotos([...photos, ...route.params.capturedPhotos])
      }
    })
  })

  const saveItem = () => {
    new Promise((resolve, reject) => {
      setLoading(true)
      if(isNew) {
        return resolve(ItemApi.create(item.closet.id, name, note, photos))
      }else {
        return resolve(ItemApi.update(item.id, name, note, photos))
      }
    }).then((r) => {
      navigation.goBack()
    }).catch(err => {
      Alert.alert('Usps!', err.response.data.errors.join("\n"))
    }).finally(() => {
      setLoading(false)
    })
  }

  const removePhoto = (i) => {
    Alert.alert('Actions', null, [
      {
        text: "Delete", 
        style:'destructive',
        onPress: () => {
          setPhotos(photos.filter((p, index) => index != i))
        }
      },
      {
        cancelable: true,
        text: "Cancel",
        style: "cancel"
      }
    ])
  }

  const addPhotos = () => {
    navigation.navigate("CameraScreen", {
      maxPhotosCount: MAX_PHOTOS - Object.keys(photos).length,
      targetScreen: 'ItemEditScreen'
    })
  }

  return ( 
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAwareScrollView style={styles.container} behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <Loader animating={loading}/>
        <View style={{marginBottom:10}}>
          <Text style={styles.label}>Name</Text>
          <TextInput onChangeText={name => setName(name)} value={name} placeholderTextColor="grey" placeholder='Item Name' style={styles.textInput}></TextInput>
        </View>
        <View style={{marginBottom:10}}>
          <Text style={styles.label}>Note</Text>
          <View style={styles.textAreaContainer} >
            <TextInput
              onChangeText={note => setNote(note)}
              value={note}
              style={styles.textArea}
              underlineColorAndroid="transparent"
              placeholder="Type something"
              placeholderTextColor="grey"
              numberOfLines={10}
              multiline={true}
            />
          </View>
        </View> 
        <View style={{marginBottom:10}}>
          <Text style={styles.label}>Photos</Text>
          <View style={{width:width, marginTop:5, flex:1, flexDirection:'row', flexWrap:'wrap'}}>
            {
                photos.map((photo, i) => {
                  return (
                    <ItemPhoto label={true} onPress={() => removePhoto(i)} key={i} item={photo}/>
                  )
                })
            }
            {
              Object.keys(photos).length < MAX_PHOTOS ? 
              <>
                <TouchableOpacity onPress={() => addPhotos()} style={{marginRight:10, justifyContent:'center', backgroundColor:'#ccc', width:((width - 70) / 4), height:100, borderRadius:5}}>
                  <Icon type='font-awesome' color={"#fff"} name='plus-circle' size={40}/>
                </TouchableOpacity>
              </> : null
            }
          </View>
        </View>
      </KeyboardAwareScrollView> 
    </TouchableWithoutFeedback>
  )
}

export default ItemEditScreen

const styles = StyleSheet.create({
  button:{
    padding:15,
    backgroundColor:'#00B4D8',
    borderRadius:5,
    alignItems:'center'
  },
  container: {
    flex:1,
    padding:20,
  },
  label: {
    fontSize:17,
    fontWeight:'600',
    marginBottom:5,
    color:'#555'
  },
  photos: {
    flex:1,
    flexWrap:'wrap',
    flexDirection: 'row',
  },
  textInput: {
    padding:15,
    backgroundColor:'#fff'
  },
  textAreaContainer: {
    backgroundColor:'#fff',
    padding: 10
  },
  textArea: {
    height: 150,
    justifyContent: "flex-start"
  }
})