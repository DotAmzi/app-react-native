/** @format */

import Home from './screens/Home';
import NewPost from './screens/NewPost';
import {Provider} from 'react-redux';
import reducers from './redux/reducers';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';

import { Navigation } from "react-native-navigation";

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

Navigation.registerComponent('redesocial.home', () => Home);
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