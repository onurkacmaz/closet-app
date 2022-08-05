import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CombineDetailScreen = ({route, navigation}) => {

  let { combine } = route.params;
  
  return (
    <View style={{padding:20}}>
      <Text style={{fontWeight:'800', fontSize:20}}>{combine.title}</Text>
      <Text style={{marginTop:10, fontWeight:'500', fontSize:15}}>{combine.description}</Text>
      <View>
        {
          combine.combine_items.map((combineItem, i) => {
            return (
              <Text>{combineItem.item?.name}</Text>
            )
          })
        }
      </View>
    </View>
  )
}

export default CombineDetailScreen

const styles = StyleSheet.create({})