import { Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import ClosetApi from '../../store/Closet'
import Loader from '../../components/Loader'
import { Icon } from 'react-native-elements/dist/icons/Icon'

const ClosetEditScreen = ({route, navigation}) => {
  
  const [closet, setCloset] = useState({})
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [loading, setLoading] = useState(false)

  useLayoutEffect(() => {
    navigation.setOptions({
      title: Object.keys(closet).length <= 0 ? 'New Closet' : 'Edit Closet',
      headerRight: () => (
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity onPress={() => saveCloset()} style={{paddingLeft:20}}>
            <Icon type='font-awesome5' size={20} color="#95CD41" name='save'></Icon>
          </TouchableOpacity>
        </View>
      ),
    })
  })

  useEffect(() => { 
    let closet = route.params.closet
    setCloset(closet)
    setName(closet?.name)
    setDescription(closet?.description)
  }, [])

  const saveCloset = () => {
    setLoading(true)
    if(Object.keys(closet).length <= 0) {
      ClosetApi.create(name, description)
      .then(r => {
        if (r.status == 201) {
          navigation.goBack()
        }
      }).catch(err => {
        Alert.alert('Usps!', err.response.data.errors.join("\n"))
      }).finally(() => {
        setLoading(false)
      })
    }else {
      ClosetApi.update(closet.id, name, description)
      .then(r => {
        if (r.status == 200) {
          navigation.goBack()
        }
      }).catch(err => {
        Alert.alert('Usps!', err.response.data.errors.join("\n"))
      }).finally(() => {
        setLoading(false)
      })
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <Loader animating={loading}/>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
        <View style={{marginBottom:10}}>
          <Text style={styles.label}>Name</Text>
          <TextInput placeholder='Name' value={name} onChangeText={name => setName(name)} style={styles.textInput}></TextInput>
        </View>
        <View style={{marginBottom:10}}>
          <Text style={styles.label}>Description</Text>
          <View style={styles.textAreaContainer} >
            <TextInput
              value={description}
              onChangeText={description => setDescription(description)}
              style={styles.textArea}
              underlineColorAndroid="transparent"
              placeholder="Type something"
              placeholderTextColor="grey"
              numberOfLines={10}
              multiline={true}
            />
          </View>
        </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default ClosetEditScreen

const styles = StyleSheet.create({
  container: {
    flex:1,
    margin:20
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
  },
  label: {
    fontSize:17,
    fontWeight:'600',
    marginBottom:5,
    color:'#555'
  },
  button:{
    padding:15,
    backgroundColor:'#00B4D8',
    borderRadius:5,
    alignItems:'center'
  },
})