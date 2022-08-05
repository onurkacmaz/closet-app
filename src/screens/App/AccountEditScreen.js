import { Alert, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { Icon } from 'react-native-elements'
import AccountApi from '../../store/Account'
import { AuthContext } from '../../components/context'

const AccountEditScreen = ({route, navigation}) => {

  const { getUser, syncUser } = useContext(AuthContext)
  const [user, setUser] = useState({})
  const [name, setName] = useState(null)

  const updateAccount = () => {
    AccountApi.update(user.id, name).then(r => {
      syncUser(r.data.data).then(() => {
        alert('Account updated.')
      })
    }).catch(err => {
      Alert.alert('Usps!', err.response.data.errors.join("\n"))
    })
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Account Edit',
      headerRight:() => {
        return (
          <TouchableOpacity onPress={() => updateAccount()}>
            <Icon type='font-awesome5' size={20} color="#95CD41" name='save' />
          </TouchableOpacity>
        )
      }
    })
  })

  useEffect(() => {
    getUser().then(r => {
      let data = JSON.parse(r)
      setUser(data)
      setName(data.name)
    })
  }, [])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <Text style={{marginBottom:10, color:'#444', fontWeight:'600', fontSize:15}}>Name</Text>  
        <TextInput onChangeText={name => setName(name)} value={name} placeholderTextColor="grey" placeholder='Name' style={styles.textInput}></TextInput>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

export default AccountEditScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin:20
  },
  textInput: {
    padding:15,
    backgroundColor:'#fff'
  }
})