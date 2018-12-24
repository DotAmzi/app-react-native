import React, { Component } from 'react';
import {
  Text,
  View,
  Image
} from 'react-native';



const TakePic = ({imageUser}) => {
  return (
    <View>
      {
        imageUser ? (
          <Image
            source={imageUser}
            style={{ height: 140, width: 140, borderRadius: 70, }}
          />
        ) :
        (<Text>maroka</Text>)
      }
    </View>
  );
}

export {TakePic};