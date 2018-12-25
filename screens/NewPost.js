import React, { Component } from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Text
} from 'react-native';
import {SwitchElement} from "../components/switchElement";
import { ArrowElement } from '../components/arrowElement';
import { Navigation } from "react-native-navigation";
import listElement from "../assets/listElements.json";
import {TakePic} from '../components/TakePic';
import {Chips} from '../components/chips';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';

import { 
  pictureChanged, 
  titleChanged, 
  descriptionChanged,
  websiteChanged, 
  locationChanged,
  facebookChanged,
  instagramChanged,
  twitterChanged,
  resetForms,
  changeStep
} from '../redux/actions';

class NewPost extends Component {
  static get options() {
    return {
      topBar: {
        title: {
          text: "New Post",
          fontFamily: 'System San Francisco Display Regular'
        },
        rightButtons: [{
          id: "next-post",
          text: "Next",
          fontFamily: 'System San Francisco Display Regular'
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
    if(this.props.step === 2) {
      Navigation.mergeOptions(this.props.componentId, {
        topBar: {
          rightButtons: [
            {
              id: 'done',
              text: 'Done',
              fontFamily: 'System San Francisco Display Regular'
            }
          ]
        }
      });
    }
    this.state.isFetching = false;
  }

  getLocationAsync = () => {
    navigator.geolocation.getCurrentPosition((position) => {
        const region = 'Lat/Lng: ' + position.coords.latitude + ',' + position.coords.longitude;
        this.props.locationChanged(region);
      },
      error => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    )
  }

  onPress() {
    const options = {
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.error) {
        Alert.alert(
          'Erro',
          'Error processing image',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )
      }else if(response.didCancel) {
        console.log('User cancelled image picker');
      } else {
        this.props.pictureChanged({ uri: response.uri });
      }
    });
  }

  onRefresh() {
    this.setState({ isFetching: true }, function() { this.setState({elements: listElement}) });
  }

  componentWillReceiveProps(newProps) {
    if(newProps.step === 2) {
      Navigation.mergeOptions(this.props.componentId, {
        topBar: {
          rightButtons: [
            {
              id: 'done',
              text: 'Done',
              fontFamily: 'System San Francisco Display Regular'
            }
          ]
        }
      });
    }else{
      Navigation.mergeOptions(this.props.componentId, {
        topBar: {
          rightButtons: [
            {
              id: 'next-post',
              text: 'Next'
            }
          ]
        }
      });
    }

  }

  navigationButtonPressed({ buttonId }) {
    if(buttonId === 'next-post' && this.props.step === 1) {
      if (this.props.description === '') {
        Alert.alert(
          'Erro',
          'Description Input Required',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )
      } else {
        this.props.changeStep(2)
      }
    }
    if(buttonId === 'cancel-post' && this.props.step === 2) {
      this.props.changeStep(1);
    }
    if(buttonId === 'done' && this.props.step === 2) {
      this.props.resetForms();
      Alert.alert(
        'Success',
        'Registry successfully saved',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
      this.props.changeStep(1);
    }
  }

  goToScreen = (screenName) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: screenName
      }
    });
  }

  renderChips(tagsSelect) {
    tagsSelect.map((tag, i) => {
      return (
        <Text>{tag}</Text>
      )
    });
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.elements}
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.isFetching}
          renderItem={({item}) => {
            if(item.step === this.props.step) {
              switch (item.type) {
                case "text":
                  return (
                    <View style={styles.line}>
                      <TextInput
                        style={styles.fieldText}
                        onChangeText={(text) => this.props[item.name + 'Changed'](text)}
                        value={this.props[item.name]}
                        placeholder={item.text}
                      />
                    </View>
                  )
                  break;

                case "pic":
                  return (
                    <View style={styles.line}>
                      <TouchableOpacity onPress={() => this.onPress()}>
                        <TakePic imageUser={this.props.picture} />
                      </TouchableOpacity>
                    </View>
                  );
                break;

                case "toogle":
                  return (
                    <SwitchElement 
                      sub={item.text}
                      name={item.name}
                      onValueChange={(value) => this.props[item.name + 'Changed'](value)}
                      valueProps={this.props[item.name]}
                    />
                  )
                break;

                case "arrow":
                  return (
                    <TouchableOpacity onPress={() => this.getLocationAsync()}>
                      <View style={styles.line}>
                        <ArrowElement text={this.props.location ? this.props.location : item.text} />
                      </View>
                    </TouchableOpacity>
                  )
                break;
                
                case "tags":
                  return (
                    <View style={styles.line}>
                      <TouchableOpacity onPress={() => this.goToScreen('redesocial.tags')}>
                          <ArrowElement text={item.text} />
                          {this.props.tagsSelect.map((tag, i) => (<Chips name={tag} color="#FF1654" />))}
                      </TouchableOpacity>
                    
                    </View>

                  )
                break;
              
                default:
                  break;
              }
            }
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  fieldText: {
    height: 70,
    fontSize: 20,
    fontFamily: 'System San Francisco Display Regular'
  },
  labelSwitch: {
    fontSize: 20
  },
  line: {
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  }
});

const mapStateToProps = state => {
  return {
    picture: state.fields.picture,
    title: state.fields.title,
    description: state.fields.description,
    website: state.fields.website,
    location: state.fields.location,
    tagsSelect: state.fields.tagsSelect,
    facebook: state.fields.facebook,
    instagram: state.fields.instagram,
    twitter: state.fields.twitter,
    step: state.fields.step
  }
};

export default connect(mapStateToProps, { 
  pictureChanged, 
  titleChanged, 
  descriptionChanged,
  websiteChanged, 
  locationChanged,
  facebookChanged,
  instagramChanged,
  twitterChanged,
  resetForms,
  changeStep
})(NewPost);
