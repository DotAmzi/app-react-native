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

    this.state = {
      elements: listElement
    };
    this.state.step = 1;
    this.state.isFetching = false;
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

  onRefresh() {
    this.setState({ isFetching: true }, function() { this.setState({elements: listElement}) });
  }

  navigationButtonPressed({ buttonId }) {
    if(buttonId === 'next-post' && this.state.step === 1) {
      this.setState({step: 2})
    }
    if(buttonId === 'cancel-post' && this.state.step === 2) {
      this.setState({step: 1})
    }
  }

  getPhoto(state) {
    if(state.step === 1) {
      return (
        <TouchableOpacity onPress={() => this.onPress()}>
          <TakePic imageUser={{uri: 'https://t4.rbxcdn.com/c3c90deaeaff865ef9c1229ff6f34833'}} />
        </TouchableOpacity>
      );
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {this.getPhoto(this.state)}
        <FlatList
          data={this.state.elements}
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.isFetching}
          renderItem={({item}) => {
            if(item.step === this.state.step) {
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
