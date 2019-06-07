

 
var React = require('react-native');
var { AsyncStorage } = React;

import { combineReducers } from 'redux';

import { Actions } from 'react-native-router-flux';

import { LOGIN_SUCCESS, LOGGED_IN, LOGGED_OUT} from "../actions/action_types"

let userState = { loggedIn: false };

export default function authReducer(state = userState, action){
    switch (action.type) {
        case LOGIN_SUCCESS:
            state = Object.assign({}, state, {loggedIn: true});
            AsyncStorage.setItem('token', action.token); //save the token
            console.log('zehkaefu');
            Actions.popTo('home');
            return state;
        case LOGGED_IN:
            state = Object.assign({}, state, {loggedIn: true});
            console.log('zehkaefu');
            return state;

        case LOGGED_OUT:
            state = Object.assign({}, state, {loggedIn: false});
            AsyncStorage.removeItem('token'); //clear token on device
            Actions.welcome();
            return state;

        default:
            return state;
    }
};
