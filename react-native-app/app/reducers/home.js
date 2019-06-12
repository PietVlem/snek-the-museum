
import { FETCH_MUSEUM_DATA,FETCH_PROFILE_DATA } from '../actions/action_types';

export default function homeReducer(state = [], action) {
  switch (action.type) {
      case FETCH_MUSEUM_DATA:
      return action.data;
      case FETCH_PROFILE_DATA:
      return action.data;
    default:
      return state;
  }
}