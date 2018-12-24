import React, { Component } from 'react';
import {
  TextInput,
  View,
  StyleSheet,
} from 'react-native';
import {SwitchElement} from "../components/switchElement";
import { Navigation } from "react-native-navigation";


export default class NewPost extends Component {
  static get options() {
    return {
      topBar: {
        title: {
          text: "New Post"
        },
        rightButtons: [{
          id: "next-post",
          text: "Next"
        }],
        leftButtons: [{
          id: "cancel-post",
          icon: require('../assets/back.png'),
          iconSize: 30
        }],
      }
    };
  }

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);

    this.state = {
      text: 'campo'
    }
  }

  navigationButtonPressed({ buttonId }) {
    console.log(buttonId)
  }

  render() {
    return (
			<View>
				<TextInput
          style={styles.fieldText}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />

        <SwitchElement sub="Camilo"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fieldText: {
    height: 70,
    fontSize: 20
  },
  labelSwitch: {
    fontSize: 20
  }
});
