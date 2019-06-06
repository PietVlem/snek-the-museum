import { combineReducers } from 'redux';

import githubReducer from "./home"
import authReducer from "./auth"

// Combine all the reducers
const rootReducer = combineReducers({ githubReducer,authReducer });

export default rootReducer;
