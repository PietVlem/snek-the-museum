
import { FETCH_MUSEUM_DATA } from '../actions/action_types';

export default function homeReducer(state = [], action) {
  switch (action.type) {
      case FETCH_MUSEUM_DATA:
      return action.data;
    default:
      return state;
  }
}