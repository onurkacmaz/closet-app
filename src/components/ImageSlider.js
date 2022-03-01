import { Dimensions, ScrollView, TouchableOpacity, Image, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Config from '../store/Config';

const ImageSlider = (props) => {
  
  const scrollRef = useRef();

  const [isActive, setIsActive] = useState(false)
  const images = props.images;
  const {width} = Dimensions.get('window')
  const height = width * (isActive ? 1.5 : 1);
  const [scrollTo, setScrollTo] = useState(props.scrollTo)

  useEffect(() => {
    scrollRef.current?.scrollTo(
      {
        x: (scrollTo.id * width) - width,
        animated: true
      }
    )
  })

  return (
    <View>
        <ScrollView ref={scrollRef} pagingEnabled horizontal showsHorizontalScrollIndicator={false} style={{width:width, height:height}}>
          {
            images.map((image) => {
              return (
                <TouchableOpacity key={image.id} onPress={() => props.enableZoom ? setIsActive(!isActive) : false}>
                  <Image style={{width:width, height:height, resizeMode:'contain'}} source={{
                    uri: Config.domain + image.url
                  }} />
                </TouchableOpacity>
              )
            })
          }
        </ScrollView>
    </View>
  )
}

export default ImageSlider