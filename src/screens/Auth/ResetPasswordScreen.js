import { Alert, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableNativeFeedback, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import AuthApi from '../../store/Auth';

const ResetPasswordScreen = ({route, navigation}) => {
 
  const [email, setEmail] = useState("");

  const handleSendEmail = () => {
    AuthApi.sendResetPasswordEmail(email)
    .then(r => {
      if (r.status === 200) {
        Alert.alert(null, 'Email will be sent. Please check your inbox.')
        navigation.goBack()
      }
    })
    .catch(err => {
      Alert.alert('Usps!', err.response.data.errors.join("\n"))
    })
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
      <View style={[styles.inputContainer, {alignItems:'center', marginBottom:10}]}>
        <Text style={{fontSize:30, fontWeight:'700'}}>RESET PASSWORD</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput value={email} onChangeText={email => setEmail(email)} keyboardType='email-address' placeholder='Email' style={styles.input} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => handleSendEmail()} style={styles.button}>
        <Text style={styles.buttonText}>Send Email</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

export default ResetPasswordScreen

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
  },
  inputContainer: {
      width: '80%'
  },
  input: {
      backgroundColor: 'white',
      padding:20,
      borderRadius: 10,
      marginTop: 10
  },
  buttonContainer: {
      width: '80%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20
  },
  button: {
      alignItems:'center',
      backgroundColor: '#0782F9',
      width: '100%',
      padding: 15,
      borderRadius:10
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth:2
  },
  buttonText: {
      color:'white',
      fontWeight: '700',
      fontSize: 16
  },
  buttonOutlineText: {
      color:'#0782F9',
      fontWeight: '700',
      fontSize: 16
  }
})