
import { FETCH_MUSEUM_DATA,FETCH_PROFILE_DATA,FETCH_EXHIBITION_DATA,FETCH_CATEGORIES_DATA,FETCH_DISABILITIES_DATA } from '../actions/action_types';
import { combineReducers } from 'redux';


const initialState = {
  profile: null,
  exhibition: [],
  museum: [],
  categories:[],
  disabilities:[]
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
    case FETCH_CATEGORIES_DATA: {
      return Object.assign({}, state, {
        categories: action.data
      })
    }
    case FETCH_DISABILITIES_DATA: {
      return Object.assign({}, state, {
        disabilities: action.data
      })
    }
    default:
      return state
  }
}

export default homeReducer;
