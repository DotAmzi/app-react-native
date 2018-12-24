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
  TWITTER
} from './types';
import feed from '../../assets/feed.json';

export const pictureChanged = (text) => {
  return {
    type: PICTURE,
    payload: text
  };
};

export const titleChanged = (text) => {
  return {
    type: TITLE,
    payload: text
  };
};

export const descriptionChanged = (text) => {
  return {
    type: DESCRIPTION,
    payload: text
  };
};

export const websiteChanged = (text) => {
  return {
    type: WEBSITE,
    payload: text
  };
};

export const locationChanged = (text) => {
  return {
    type: LOCATION,
    payload: text
  };
};

export const tagsChanged = (text) => {
  return {
    type: LOCATION,
    payload: text
  };
};

export const tagsLoad = () => {
  return (dispatch) => {
    dispatch({ type: TAGS });
    setTimeout(() => {
      dispatchTagsSuccess(dispatch, feed);
    }, 1500)
  };
};

export const dispatchTagsSuccess = (dispatch, tags) => {
  dispatch({
    type: TAGS_SUCCESS,
    payload: tags
  });
};

export const facebookChanged = (text) => {
  return {
    type: FACEBOOK,
    payload: text
  };
};

export const instagramChanged = (text) => {
  return {
    type: INSTAGRAM,
    payload: text
  };
};

export const twitterChanged = (text) => {
  return {
    type: TWITTER,
    payload: text
  };
};