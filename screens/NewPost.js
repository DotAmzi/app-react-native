import React, { Component } from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native';
import {SwitchElement} from "../components/switchElement";
import { ArrowElement } from '../components/arrowElement';
import { Navigation } from "react-native-navigation";
import listElement from "../assets/listElements.json";
import {TakePic} from '../components/TakePic';
import ImagePicker from 'react-native-image-picker';

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

    this.state = listElement;
  }

  onPress() {
    const options = {
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // this.state.imageSelected({ uri: response.uri });
      }
    });
  }

  navigationButtonPressed({ buttonId }) {
    console.log(buttonId);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <TouchableOpacity onPress={() => this.onPress()}>
          <TakePic imageUser={{uri: 'https://t4.rbxcdn.com/c3c90deaeaff865ef9c1229ff6f34833'}} />
        </TouchableOpacity>

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

              case "arrow":
                return (
                  <View style={styles.line}>
                    <ArrowElement text={item.text} />
                  </View>
                )
              break;
              
              case "tags":
                return (
                  <View style={styles.line}>
                    <ArrowElement text={item.text} />
                  </View>
                )
              break;
            
              default:
                break;
            }
          }}
        />
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
  },
  line: {
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  }
});
