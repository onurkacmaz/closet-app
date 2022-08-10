import { Alert, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ItemPhoto from '../../components/ItemPhoto';
import ImageSlider from '../../components/ImageSlider';
import ClosetTag from '../../components/ClosetTag';
import { useState, useRef, useLayoutEffect } from 'react';
import { Icon } from 'react-native-elements';
import ItemApi from '../../store/Item';
import Loader from '../../components/Loader'

const ItemDetailScreen = ({navigation, route}) => {

  const { width } = Dimensions.get('window');

  const [item, setItem] = useState({})
  let [closet, setCloset] = useState({});

  const [photos, setPhotos] = useState([])
  const [ps, setPs] = useState([])
  const [loading, setLoading] = useState(false)

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Item Detail'
    })
    const initialize = navigation.addListener('focus', () => { 
      setLoading(true)
      ItemApi.get(route.params.item.id).then(r => {
        let data = r.data.data
        setPhotos(data.photos)
        setPs(data.photos)
        setCloset(data.closet)
        setItem(data)
      }).finally(() => {
        setLoading(false)
      })
    })
    return initialize
  })

  const changeFeaturedImage = (photo, index) => {
    let filteredPhotos = ps.filter((p, i) => {
      return i != index
    })

    filteredPhotos.push(photo)
    filteredPhotos = filteredPhotos.reverse()
    setPhotos(filteredPhotos)
  }

  const navigateClosetDetail = () => {
    navigation.navigate('ClosetDetailScreen')
  }

  const navigateItemEditScreen = () => {
    navigation.navigate('ItemEditScreen', {item: item})
  }

  const deleteItem = () => {
    Alert.alert("Are you sure?", "Are you sure for want to delete this item?", [
      {
        text: "OK", 
        onPress: () => {
          ItemApi.delete(item.id).then(r => {
            navigation.goBack()
					})
        }
      },
      {
        cancelable: true,
        text: "Cancel",
        style: "cancel"
      }
    ])
  }

  function GetImageSlider() {
    return <ImageSlider enableZoom={true} images={photos}/>
  }

  if (loading) {
    return (
      <Loader animating={loading}/>
    )
  }
  
  return (
    <ScrollView>
      <GetImageSlider />
      <View style={styles.actionBar}>
        <TouchableOpacity onPress={() => navigateItemEditScreen()} style={[{backgroundColor:'#00B4D8'},styles.actionButton]}>
          <Icon color="#fff" type='font-awesome' name='edit' size={15} />
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteItem()} style={[{backgroundColor:'#FF5E78'}, styles.actionButton]}>
          <Icon color="#fff" type='font-awesome' name='times' size={15} />
          <Text style={styles.actionButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
      <View style={{margin:20}}>
        <View style={{marginTop:20}}>
          <Text style={{fontWeight:'700', fontSize:25}}>{item.name}</Text>
          <Text style={{marginTop:10, fontWeight:'500', color:'#999', fontSize:15}}>{item.note}</Text>
        </View>
        <Text style={{marginTop:10, marginTop:20, fontWeight:'700', fontSize:20}}>Photos</Text>
        <View style = {[styles.container, {width: width, marginTop:10}]}>
          {
            ps.map((photo, i) => {
              return <ItemPhoto onPress={() => changeFeaturedImage(photo, i)} key={photo.id} item={photo} />
            })
          }
        </View>
        <View style={{marginTop:20}}>
          <Text style={{fontWeight:'700', fontSize:20}}>Assigned By</Text>
          <View style={{marginTop:10, flex:1, flexDirection:'row', flexWrap:'wrap'}}>
            <TouchableOpacity key={closet.id} onPress={() => navigateClosetDetail()}>
              <ClosetTag closetName={closet.name}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default ItemDetailScreen

const styles = StyleSheet.create({
  container: {
    marginTop:5, 
    flexWrap:'wrap',
    flexDirection: 'row',
 },
 actionBar: {
   flexDirection:'row'
 },
 actionButton: {
   flexDirection:'row',
   alignItems:'center',
   justifyContent:'center',
   padding:15,
   width:'50%'
 }, 
 actionButtonText: {
   marginLeft:5,
   fontWeight:'700',
   fontSize:15,
   color:'#fff'
 }
})