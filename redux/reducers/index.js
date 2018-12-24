import { combineReducers } from 'redux';
import FieldsReducers from './FieldsReducers';

export default combineReducers({
  fields: FieldsReducers
});