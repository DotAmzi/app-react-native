/** @format */

import Home from './screens/Home';
import NewPost from './screens/NewPost';

import { Navigation } from "react-native-navigation";

Navigation.registerComponent('redesocial.home', () => Home);
Navigation.registerComponent('redesocial.newPost', () => NewPost);

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