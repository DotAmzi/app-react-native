import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button
} from 'react-native';

import { Navigation } from "react-native-navigation";

export default class Tags extends Component {
  static get options() {
    return {
      topBar: {
        title: {
          text: "Tagging a Product"
        },
        leftButtons: [{
          id: "back",
          icon: require('../assets/back.png'),
          iconSize: 30
        }],
      }
    };
  }

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this); 
  }

  navigationButtonPressed({ buttonId }) {
    if(buttonId === 'back') {
      Navigation.push(this.props.componentId, {
        component: {
          name: 'redesocial.newPost'
        }
      });
    }
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
