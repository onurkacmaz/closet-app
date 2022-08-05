import { TouchableOpacity, StyleSheet, Text, View, Image, Alert } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react' 
import { Camera } from 'expo-camera'; 
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { FlipType, manipulateAsync, SaveFormat } from 'expo-image-manipulator';

const CameraScreen = ({navigation, route}) => {

  const MAX_PHOTOS = route.params.maxPhotosCount;
  const [capturedPhotos, setCapturedPhotos] = useState([])
  const [camera, setCamera] = useState();
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHasPermission] = useState(null); 

  useLayoutEffect(() => {
    navigation.setOptions({
      header:() => {},
      gestureEnabled: false
    })
  })

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const rotate90andFlip = async (photo) => {
    let options = {
      base64:true,
      compress: 0,
      format: SaveFormat.JPEG
    }
    let actions = [
      {resize: {width: photo.width * 0.5, height: photo.height * 0.5}}
    ];
    if(cameraType === Camera.Constants.Type.front) {
      actions.push({flip: FlipType.Horizontal})
      actions.push({rotate: 360})
    }
    return await manipulateAsync(
      photo.uri,
      actions,
      options
    );
  };

  const takePhoto = async () => {
    if (Object.keys(capturedPhotos).length < MAX_PHOTOS) {
      await camera.takePictureAsync({
        base64:true,
        onPictureSaved: (r) => {
          rotate90andFlip(r).then(m => {
            setCapturedPhotos([...capturedPhotos, ...[m]])
          })
        }
      })
    }
  }

  const approvePhotos = () => {
    navigation.navigate(route.params.targetScreen, {capturedPhotos: capturedPhotos})
  }

  const goBack = () => {
    if(Object.keys(capturedPhotos).length > 0) {
      Alert.alert('Are you sure?', 'Are you sure you want to go back?', [
        {
          text: "Yes, Go back!", 
          onPress: () => {
            navigation.goBack()
          }
        },
        {
          cancelable: true,
          text: "Cancel",
          style: "cancel"
        }
      ])
    }else {
      navigation.goBack()
    }
  }

  const retryAgain = () => {
    setCapturedPhotos([])
  }

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const changeCameraType = () => {
    if(cameraType == Camera.Constants.Type.back) {
      setCameraType(Camera.Constants.Type.front)
      return
    }
    if(cameraType == Camera.Constants.Type.front) {
      setCameraType(Camera.Constants.Type.back)
      return
    }
  }
   
  return (
    <View style={styles.container}>
      <Camera ref={ref => setCamera(ref)} style={{height: '100%'}} type={cameraType}>
        <View style={{justifyContent:'space-between', padding:20, marginTop:20, flexDirection:'row'}}>
          <TouchableOpacity style={{justifyContent:'center', backgroundColor:'rgba(0,0,0, 0.4)', borderRadius:100, alignItems:'center', zIndex:1001, paddingVertical:10, paddingHorizontal:20}} onPress={() => goBack()}>
            <Icon color={"#fff"} type='font-awesome' name='times' size={20} />
          </TouchableOpacity>
          <TouchableOpacity style={{justifyContent:'center', backgroundColor:'rgba(0,0,0, 0.4)', borderRadius:100, alignItems:'center', zIndex:1001, paddingVertical:10, paddingHorizontal:20}} onPress={() => changeCameraType()}>
            <Icon color={"#fff"} type='font-awesome' name='refresh' size={20} />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          {
            Object.keys(capturedPhotos).length > 0 ?
            [capturedPhotos.slice(-1)[0]].map((capturedPhoto, i) => {
              return (
                <TouchableOpacity key={i} onPress={() => approvePhotos()} style={{flexDirection:'row', justifyContent:'center', alignItems:'center', backgroundColor:'#fff', borderRadius:100, padding:5}}>
                  <Image style={{borderRadius:100, resizeMode:'cover'}} source={{uri: `data:image/jpg;base64,${capturedPhoto.base64}`, width:45, height:45}} />
                  <Text style={{fontSize:20, color:'#333', fontWeight:'700', paddingHorizontal:10}}>{Object.keys(capturedPhotos).length}</Text>
                </TouchableOpacity>
              )
            }) : null
          }
          {
            Object.keys(capturedPhotos).length < MAX_PHOTOS ?
            <>
              <TouchableOpacity
                style={styles.button}
                onPress={() => takePhoto()}>
                <Icon style={styles.text} type="font-awesome" name='camera' color={"#000"}/>
              </TouchableOpacity> 
            </> : 
            <TouchableOpacity
              style={styles.button}
              onPress={() => retryAgain()}>
              <Icon style={styles.text} type="font-awesome" name='refresh' color={"#000"}/>
            </TouchableOpacity> 
          }
        </View>
      </Camera>
      
    </View>
  )
}

export default CameraScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }, 
  buttonContainer: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection:'row',
    alignItems:'flex-end',
    justifyContent:'space-between',
    position:'absolute',
    bottom:0,
    left:0,
    right:0,
    padding:10
  },
  button: {
    marginRight:10
  },
  text: {
    padding:15,
    borderRadius:100,
    backgroundColor:'#fff',
    fontSize: 18,
    color: 'white',
  },
  capturedPhotos:{
    flexDirection:'row',
    padding:20, 
    width:'100%',
    backgroundColor: '#fff',
  }
});