import React, { Component } from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  FlatList,
  Text
} from 'react-native';
import {SwitchElement} from "../components/switchElement";
import { ArrowElement } from '../components/arrowElement';
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

    this.state = [{
      type: "pic"
    }, {
      type: "text",
      text: "Title (optional)",
      name: "title"
    }, {
      type: "text",
      text: "Description",
      name: "description"
    }, {
      type: "text",
      text: "webSite (optional)",
      name: "title"
    }, {
      type: "tags",
      text: "Location",
      name: "location"
    }, {
      type: "tags",
      text: "Add Tags",
      name: "tags"
    }, {
      type: "toogle",
      text: "Facebook",
      name: "facebook"
    }, {
      type: "toogle",
      text: "Instagram",
      name: "insta"
    }, {
      type: "toogle",
      text: "Twitter",
      name: "twitter"
    }]
  }

  navigationButtonPressed({ buttonId }) {
    console.log(buttonId)
  }

  render() {
    return (
      <FlatList
        data={this.state}
        renderItem={({item}) => {
          switch (item.type) {
            case "text":
              return (
                <View style={styles.line}>
                  <TextInput
                    style={styles.fieldText}
                    onChangeText={(text) => this.setState(item.name)}
                    value={item.text}
                  />
                </View>
              )
              break;

            case "toogle":
              return (
                <SwitchElement sub={item.text} />
              )
            break;

            case "tags":
              return (
                <View style={styles.line}>
                  <ArrowElement text={item.text} />
                </View>
              )
            break;
            
            case "tags":
              return (
                <ArrowElement text={item.text} />
              )
            break;
          
            default:
              break;
          }
        }}
      />
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
  },
  line: {
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  }
});
