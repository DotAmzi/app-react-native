/** @format */

import Tags from './screens/Tags';
import NewPost from './screens/NewPost';
import {Provider} from 'react-redux';
import reducers from './redux/reducers';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';

import { Navigation } from "react-native-navigation";

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

Navigation.registerComponent('redesocial.tags', () => Tags);
Navigation.registerComponentWithRedux('redesocial.newPost', () => NewPost, Provider, store);

Navigation.events().registerAppLaunchedListener(() => { 

  Navigation.setRoot({
    root: {
      stack: {
        children: [{
          component: {
            name: "redesocial.newPost"
          }   
        }]
      }
    }
  });
});