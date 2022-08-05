import React, { useEffect, useMemo, useReducer, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Alert, LogBox, StatusBar } from 'react-native';
import LoginScreen from './src/screens/Auth/LoginScreen'
import RegisterScreen from './src/screens/Auth/RegisterScreen'
import ResetPasswordScreen from './src/screens/Auth/ResetPasswordScreen'
import ExploreScreen from './src/screens/App/ExploreScreen'
import MyClosetScreen from './src/screens/App/MyClosetScreen'
import ProfileScreen from './src/screens/App/ProfileScreen'
import ItemDetailScreen from './src/screens/App/ItemDetailScreen'
import MyClosetsScreen from './src/screens/App/MyClosetsScreen.js'
import ItemEditScreen from './src/screens/App/ItemEditScreen.js'
import ClosetDetailScreen from './src/screens/App/ClosetDetailScreen.js'
import ClosetEditScreen from './src/screens/App/ClosetEditScreen.js'
import CameraScreen from './src/screens/App/CameraScreen.js'
import PhotoPreviewScreen from './src/screens/App/PhotoPreviewScreen.js'
import AccountEditScreen from './src/screens/App/AccountEditScreen.js' 
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { AuthContext } from './src/components/context'
import AuthApi from './src/store/Auth';
import Loader from './src/components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginReducer } from './src/reducers/login';
import CombineDetailScreen from './src/screens/App/CombineDetailScreen'

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {

  const [isLoading, setIsLoading] = useState(false);

  const initialLoginState = {
    id: null,
    name: null,
    email: null,
    token: null,
    isLoading: true,
  }

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState)

  const authContent = useMemo(() => ({
    signIn: (email, password) => {
      setIsLoading(true)
      AuthApi.login(email, password)
      .then(res => {
        AsyncStorage.setItem('user', JSON.stringify(res.data.data)).then(r => {
          dispatch({type: 'LOGIN', email: email, token: res.data.data.token, id: res.data.data.id})
        })
      })
      .catch(err => {
        Alert.alert('Usps!', err.response.data.errors.join("\n"))
      }).finally(() => {
        setIsLoading(false)
      })
    },
    signOut: () => {
      setIsLoading(true)
      AsyncStorage.removeItem('user').then(r => {
        dispatch({type: 'LOGOUT'})
      })
      .finally(() => {
        setIsLoading(false)
      })
    },
    signUp: (name, email, password, passwordConfirmation) => {
      setIsLoading(true)
      AuthApi.register(name, email, password, passwordConfirmation)
      .then(res => {
        AsyncStorage.setItem('user', JSON.stringify(res.data.data)).then(r => {
          dispatch({type: 'LOGIN', email: email, token: res.data.data.token, id: res.data.data.id})
        })
      })
      .catch(err => {
        Alert.alert('Usps!', err.response.data.errors.join("\n"))
      })
      .finally(() => {
        setIsLoading(false)
      })
    },
    retrieveToken: () => {
      AsyncStorage.getItem('user').then(user => {
        if (user) {
          user = JSON.parse(user)
          AuthApi.retrieveToken(user.id, user.token).then(r => {
            dispatch({type: 'RETRIEVE_TOKEN', token: r.data.data, id: r.data.data.id})
          }).catch(err => {
            console.log(err);
            Alert.alert('Usps!', 'Please login retry.')
            dispatch({type: 'LOGOUT'})
          })
        }
      })
    },
    getUser: async () => {
      return await AsyncStorage.getItem('user')
    },
    syncUser: async (user) => {
      return await AsyncStorage.mergeItem('user', JSON.stringify(user))
    }
  }))

  function Tabs() {
    return ( 
        <Tab.Navigator screenOptions={{ 
          tabBarShowLabel:false
        }}>
          <Tab.Screen options={{
            title:'Explore',
            tabBarIcon: ({focused}) => {
              return (<Icon name='globe' size={20} type='font-awesome-5' color={focused ? '#00B4D8' : '#ccc'}/>)
            }
          }} name="ExploreScreen" component={ExploreScreen} />
          <Tab.Screen options={{
            title:'My Closet',
            tabBarIcon: ({focused}) => {
              return (<Icon name='home' size={20} type='font-awesome-5' color={focused ? '#F1D00A' : '#ccc'}/>)
            }
          }} name="MyClosetScreen" component={MyClosetScreen} />
          <Tab.Screen options={{
            title:'Profile',
            tabBarIcon: ({focused}) => {
              return (<Icon name='user' size={20} type='font-awesome-5' color={focused ? '#FF5C8D' : '#ccc'}/>)
            }
          }} name="ProfileScreen" component={ProfileScreen} />
        </Tab.Navigator> 
    )
  }

  function AppStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Tab" options={{headerShown:false}} component={Tabs} />
        <Stack.Screen name="ItemDetailScreen" options={{headerShown:true}} component={ItemDetailScreen} />
        <Stack.Screen name="MyClosetsScreen" options={{headerShown:true}} component={MyClosetsScreen} />
        <Stack.Screen name="ItemEditScreen" options={{headerShown:true}} component={ItemEditScreen} />
        <Stack.Screen name="ClosetDetailScreen" options={{headerShown:true}} component={ClosetDetailScreen} />
        <Stack.Screen name="ClosetEditScreen" options={{headerShown:true}} component={ClosetEditScreen} />
        <Stack.Screen name="CameraScreen" options={{headerShown:true}} component={CameraScreen} />
        <Stack.Screen name="PhotoPreviewScreen" options={{headerShown:true}} component={PhotoPreviewScreen} />
        <Stack.Screen name="AccountEditScreen" options={{headerShown:true}} component={AccountEditScreen} />
        <Stack.Screen name="CombineDetailScreen" options={{headerShown:true}} component={CombineDetailScreen} />
      </Stack.Navigator>
    )
  }

  function AuthStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="LoginScreen" options={{headerShown:false}} component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" options={{headerShown:false}} component={RegisterScreen} />
        <Stack.Screen name="ResetPasswordScreen" options={{headerShown:false}} component={ResetPasswordScreen} />
      </Stack.Navigator>
    )
  }

  useEffect(() => {
    authContent.retrieveToken()
  }, [])

  return (
    <AuthContext.Provider value={authContent}>
      <Loader animating={isLoading}/> 
      <NavigationContainer>
        <StatusBar animated={true} barStyle='dark-content'/>
        { loginState.token ? (<AppStack />) : (<AuthStack/>)}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
