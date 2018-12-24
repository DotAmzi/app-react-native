import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  Dimensions
} from 'react-native';

const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.height / 2);
const imageWidth = dimensions.width;

const TakePic = ({imageUser}) => {
  return (
    <View>
      {
        imageUser ? (
          <Image
            source={imageUser}
            style={{ height: imageHeight, width: imageWidth}}
          />
        ) :
        (<Text>maroka</Text>)
      }
    </View>
  );
}

export {TakePic};