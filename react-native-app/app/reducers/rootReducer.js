import { combineReducers } from 'redux';

import githubReducer from "./home"
import reducerAuth from "./auth"

// Combine all the reducers
const rootReducer = combineReducers({ githubReducer,reducerAuth });

export default rootReducer;
