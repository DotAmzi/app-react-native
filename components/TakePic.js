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
const rowHeight = imageHeight / 3;

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
        (<View style={{ height: imageHeight, width: imageWidth, flex: 1, flexDirection: 'column'}}>
          <View style={{width: imageWidth, height: rowHeight}} />
          <View style={{width: imageWidth, height: rowHeight, flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={{fontFamily: 'System San Francisco Display Regular', backgroundColor: '#FF1654', width: rowHeight, fontSize: 60, color: 'white', padding: 10, textAlign: 'center'}}>+</Text>
            <Text style={{fontFamily: 'System San Francisco Display Regular', fontSize: 30, color: 'black', paddingTop: 35, paddingLeft: 10, textAlign: 'center'}}>Add Photos</Text>
          </View>
          <View style={{width: imageWidth, height: rowHeight}} />

        </View>)
      }
    </View>
  );
}

export {TakePic};