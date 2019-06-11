
var { AsyncStorage } = require('react-native');

import { SERVER_ERROR, ERROR } from "../config";

var REQUEST_URL = "http://127.0.0.1:8080/api/v1";


// Callback : success, data, error
var AuthAPI = {
    register: function (data, callback) {
        var url = REQUEST_URL + "/singUp";
        this.requestWithoutToken(url, data, callback);
    },

    login: async function (data, callback) {
        var url = REQUEST_URL + "/signIn";
        await this.requestWithoutToken(url, data, callback);
    },

    logout(callback) {
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

                fetch(url + token, requestConfig)
                    .then((response) => response.json())
                    .then((responseData) => callback(true))
                    .catch(error => callback(false, error))
                    .done();
            } else {
                callback(true);
            }
        });
    },

    recover: function (data, callback) {
        var url = REQUEST_URL + "/recover";
        this.requestWithoutToken(url, data, callback);
    },

    requestWithoutToken(url, data, callback) {
        let requestConfig = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password,
            })
        }

        fetch(url, requestConfig)
            .then((response) => response.json())
            .then( async (responseData) => {
                console.log(responseData); 
                // 1: --> now save token to local storage
                await this.saveDataAsyncStorage(responseData);
                // 2: --> redirect to screen ...

                if (responseData.error) callback(false, null, { type: ERROR, msg: responseData.error })
                else if (responseData.success) callback(true, responseData.data, null)
            })
            .catch(error => {
                callback(false, null, { type: SERVER_ERROR })
            })
            .done();
    },

    saveDataAsyncStorage: async function(responseData){
        await AsyncStorage.multiSet([
            ["token", responseData.token],
            ["userId", responseData.userId]
        ])
        const token = await AsyncStorage.getItem('token');
        console.log(token);
    },
}

module.exports = AuthAPI;
