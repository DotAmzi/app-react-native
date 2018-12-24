import React, { Component } from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert
} from 'react-native';
import {SwitchElement} from "../components/switchElement";
import { ArrowElement } from '../components/arrowElement';
import { Navigation } from "react-native-navigation";
import listElement from "../assets/listElements.json";
import {TakePic} from '../components/TakePic';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';

import { 
  pictureChanged, 
  titleChanged, 
  descriptionChanged,
  websiteChanged, 
  locationChanged,
  tagsChanged,
  facebookChanged,
  instagramChanged,
  twitterChanged
} from '../redux/actions';

class NewPost extends Component {
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
          'Erro ao processar Imagem',
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

  navigationButtonPressed({ buttonId }) {
    if(buttonId === 'next-post' && this.state.step === 1) {
      if (this.props.description === '') {
        Alert.alert(
          'Erro',
          'Campo Descrição obrigatório',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )
      } else {
        Navigation.mergeOptions(this.props.componentId, {
          topBar: {
            rightButtons: [
              {
                id: 'done',
                text: 'Done'
              }
            ]
          }
        });
        this.setState({step: 2})
      }
    }
    if(buttonId === 'cancel-post' && this.state.step === 2) {
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
      this.setState({step: 1})
    }
  }

  goToScreen = (screenName) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: screenName
      }
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
            if(item.step === this.state.step) {
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
                    <TouchableOpacity onPress={() => this.goToScreen('redesocial.tags')}>
                      <View style={styles.line}>
                        <ArrowElement text={item.text} />
                      </View>
                    </TouchableOpacity>
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

const mapStateToProps = state => {
  return {
    picture: state.fields.picture,
    title: state.fields.title,
    description: state.fields.description,
    website: state.fields.website,
    location: state.fields.location,
    tags: state.fields.tags,
    facebook: state.fields.facebook,
    instagram: state.fields.instagram,
    twitter: state.fields.twitter
  }
};

export default connect(mapStateToProps, { 
  pictureChanged, 
  titleChanged, 
  descriptionChanged,
  websiteChanged, 
  locationChanged,
  tagsChanged,
  facebookChanged,
  instagramChanged,
  twitterChanged
})(NewPost);
