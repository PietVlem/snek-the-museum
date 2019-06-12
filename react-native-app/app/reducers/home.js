import { combineReducers } from 'redux';
import { FETCH_MUSEUM_DATA,FETCH_PROFILE_DATA } from '../actions/action_types';

const initialState = {
  Profile: [],
  Museum: []
}

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_MUSEUM_DATA: {
      return Object.assign({}, state, {
        Museum: action.Museum
      })
    }
    case FETCH_PROFILE_DATA: {
      return Object.assign({}, state, {
        Profile: action.data
      })
    }
    default:
      return state
  }
}

export default homeReducer;
