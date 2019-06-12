
import { FETCH_MUSEUM_DATA } from '../actions/action_types';
import { FETCH_EXHIBITION_DATA } from '../actions/action_types';

export default function githubReducer(state = [], action) {
  switch (action.type) {
      case FETCH_MUSEUM_DATA:
      return action.data;
      case FETCH_EXHIBITION_DATA:
      return action.data;
    default:
      return state;
  }
}