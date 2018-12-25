import React from 'react';
import { Text, StyleSheet } from 'react-native';

const Chips = ({name, color}) => {
  const {
    chipStyle,
  } = styles;

  return (
    <Text style={[chipStyle, { backgroundColor: color }]}>{name}</Text>
  );
};

const styles = StyleSheet.create({
  chipStyle: {
    fontFamily: 'System San Francisco Display Regular',
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 10,
    paddingRight: 10,
    overflow: 'hidden',
    margin: 5,
    color: 'black',
    alignSelf: 'flex-start',
  }
});

export { Chips };