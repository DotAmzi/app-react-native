import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  StyleSheet,
  TextInput
} from 'react-native';

import { 
  tagsChanged
} from '../redux/actions';

import { Navigation } from "react-native-navigation";

class Tags extends Component {
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
    this.state = {
      fieldSearch: null
    }
    Navigation.events().bindComponent(this); 
  }

  navigationButtonPressed({ buttonId }) {
    if(buttonId === 'back') {
      Navigation.push(this.props.componentId, {
        component: {
          name: 'redesocial.Tags'
        }
      });
    }
  }


  render() {
    return (
			<View>
				<View style={styles.line}>
          <TextInput
            style={styles.fieldText}
            onChangeText={(text) => this.setState({fieldSearch: text})}
            value={this.state.fieldSearch}
            placeholder='Digite sua tag'
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fieldText: {
    height: 70,
    fontSize: 20
  },
  line: {
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  }
});

const mapStateToProps = state => {
  return {
    tags: state.fields.tags,
    tagsSelect: state.fields.tagsSelect
  }
};

export default connect(mapStateToProps, { 
  tagsChanged
})(Tags);