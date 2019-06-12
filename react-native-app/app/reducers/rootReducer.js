import { combineReducers } from 'redux';

import homeReducer from "./home"
import authReducer from "./auth"

// Combine all the reducers
const rootReducer = combineReducers({ homeReducer,authReducer });

export default rootReducer;
