import { RefreshControl, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Card from '../../components/Card'
import CombineApi from '../../store/Combine'

const ExploreScreen = ({route, navigation}) => {

  const [refreshing, setRefreshing] = React.useState(false);
  const [combines, setCombines] = useState([])

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    CombineApi.all().then(r => {
      setCombines(r.data.data)
    }).finally(() => {
      setRefreshing(false)
    })
  }, []); 

  const onScroll = (e) => {
    let options = { 
      headerStyle: {}
    }
    if(e.nativeEvent.contentOffset.y > 100) {
      options = {
        headerStyle: {
          height:0
        }
      }
    }
    navigation.setOptions(options)
  }

  useEffect(() => {
    onRefresh()
  }, [])

  const navigateCombineDetailScreen = (combine) => {
    navigation.navigate('CombineDetailScreen', {combine: combine})
  }

  return (
    <ScrollView onScroll={e => onScroll(e)} refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    } style={{flex:1}}>
      <View style={styles.cardContainer}>
        {
          combines.map(combine => {
            return (
              <TouchableOpacity onPress={() => navigateCombineDetailScreen(combine)} key={combine.id} style={styles.column}>
                <Card combine={combine}/>
              </TouchableOpacity>
            )
          })
        }
      </View>
    </ScrollView>
  )
}

export default ExploreScreen

const styles = StyleSheet.create({
  card: {
    width:'100%',
    height:300,
    backgroundColor:'#fff',
    borderRadius:10
  },
  cardContainer: {
    flexWrap:'wrap',
    flexDirection:'row',
    paddingHorizontal:10,
    paddingVertical:10,
  },
  cardImages: {
    flexWrap:'wrap',
    flexDirection:'row'
  },
  cardImage: {
    resizeMode:'cover',
    backgroundColor:'#ccc'
  },
  cardHeadText: {
    fontWeight:'700',
    fontSize:20,
    padding:10
  },
  column: {
    padding:10,
    width:'50%'
  }
})