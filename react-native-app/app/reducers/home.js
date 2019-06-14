
import { FETCH_MUSEUM_DATA,FETCH_PROFILE_DATA,FETCH_EXHIBITION_DATA } from '../actions/action_types';
import { combineReducers } from 'redux';


const initialState = {
  profile: [],
  exhibition: [],
  museum: [],
  museumDetail:[]
}

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_MUSEUM_DATA: {
      return Object.assign({}, state, {
        museum: action.data
      })
    }
    case FETCH_EXHIBITION_DATA: {
      return Object.assign({}, state, {
        exhibition: action.data
      })
    }
    case FETCH_PROFILE_DATA: {
      return Object.assign({}, state, {
        profile: action.data
      })
    }
    default:
      return state
  }
}

export default homeReducer;
