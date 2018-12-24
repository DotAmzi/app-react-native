import {
  PICTURE,
  TITLE,
  DESCRIPTION,
  WEBSITE,
  LOCATION,
  TAGS,
  FACEBOOK,
  INSTAGRAM,
  TWITTER
  } from '../actions/types';
  
  const INITIAL_STATE = {
    picture: null,
    title: '',
    description: '',
    website: '',
    location: '',
    tags: [],
    facebook: false,
    instagram: false,
    twitter: false
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case TITLE:
        return { ...state, title: action.payload };
      case PICTURE:
        return { ...state, picture: action.payload };
      case DESCRIPTION:
        return { ...state, description: action.payload };
      case WEBSITE:
        return { ...state, website: action.payload };
      case LOCATION:
        return { ...state, location: action.payload };
      case TAGS:
        return { ...state, tags: action.payload };
      case FACEBOOK:
        return { ...state, facebook: action.payload };
      case INSTAGRAM:
        return { ...state, instagram: action.payload };
      case TWITTER:
        return { ...state, twitter: action.payload };
      default:
        return state;
    }
  };