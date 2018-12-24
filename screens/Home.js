import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button
} from 'react-native';

import { Navigation } from "react-native-navigation";

export default class Home extends Component {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this); 
  }

  render() {
    return (
			<View>
				<Text>Home</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});
