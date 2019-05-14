
var { AsyncStorage } = require('react-native');

import { SERVER_ERROR, ERROR } from "../config";

var REQUEST_URL = "";


// Callback : success, data, error
var AuthAPI = {
    register: function(data, callback){
        var url = REQUEST_URL +"/register";
        this.requestWithoutToken(url, data, callback);
    },

    login: function(data, callback){
        var url = REQUEST_URL + "/login";
        this.requestWithoutToken(url, data, callback);
    },

    logout(callback){
        var url = REQUEST_URL + "/logout?token=";
        AsyncStorage.getItem('token', (err, token) => {
            if (token !== null) {
                let requestConfig = {
                    method: "GET",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }

                fetch(url+token, requestConfig)
                    .then((response) => response.json())
                    .then((responseData) => callback(true))
                    .catch(error => callback(false, error))
                    .done();
            }else{
                callback(true);
            }
        });
    },

    recover: function(data, callback){
        var url = REQUEST_URL + "/recover";
        this.requestWithoutToken(url, data, callback);
    },

    requestWithoutToken(url, data, callback){
        let requestConfig = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        fetch(url, requestConfig)
            .then((response) => response.json())
            .then((responseData) => {
                if(responseData.error) callback(false, null, {type: ERROR, msg: responseData.error})
                else if (responseData.success) callback(true, responseData.data, null)
            })
            .catch(error => {
                callback(false, null, {type: SERVER_ERROR})
            })
            .done();
    }
}

module.exports = AuthAPI;
