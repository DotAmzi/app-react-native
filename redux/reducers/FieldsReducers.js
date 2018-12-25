import {
  PICTURE,
  TITLE,
  DESCRIPTION,
  WEBSITE,
  LOCATION,
  TAGS,
  TAGS_SUCCESS,
  FACEBOOK,
  INSTAGRAM,
  TWITTER,
  TAGS_SELECT,
  RESET_FIELDS,
  STEP
  } from '../actions/types';
  
  const INITIAL_STATE = {
    picture: null,
    title: '',
    description: '',
    website: '',
    location: '',
    tags: [],
    tagsSelect: [],
    facebook: false,
    instagram: false,
    twitter: false,
    step: 1
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case RESET_FIELDS:
        return INITIAL_STATE;
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
        return { ...state };
      case TAGS_SUCCESS:
        return { ...state, tags: action.payload  };
      case TAGS_SELECT:
        return { ...state, tagsSelect: action.payload };
      case FACEBOOK:
        return { ...state, facebook: action.payload };
      case INSTAGRAM:
        return { ...state, instagram: action.payload };
      case TWITTER:
        return { ...state, twitter: action.payload };
      case STEP:
        return { ...state, step: action.payload };
      default:
        return state;
    }
  };