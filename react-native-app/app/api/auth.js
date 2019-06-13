
var { AsyncStorage,Alert } = require('react-native');
import { Actions } from 'react-native-router-flux';
import { SERVER_ERROR, ERROR } from "../config";

var REQUEST_URL = "http://127.0.0.1:8080/api/v1";


// Callback : success, data, error
var AuthAPI = {
    register: function (data, callback) {
        var url = REQUEST_URL + "/signUp";
        console.log(data)
        this.requestRegister(url, data, callback);
    },

    login: async function (data, callback) {
        var url = REQUEST_URL + "/signIn";
        await this.requestWithoutToken(url, data, callback);
    },

    logout: async function (callback) {
        await this.deleteDataAsyncStorage();
    },

    deleteDataAsyncStorage: async function(){
        await AsyncStorage.removeItem('token');
        const token = await AsyncStorage.getItem('token');
        if (!token){Actions.login();}
    },

    recover: function (data, callback) {
        var url = REQUEST_URL + "/forgot";
        this.requestRecover(url, data, callback);
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

    requestRecover(url, data, callback) {
        let requestConfig = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: data.email,
            })
        }

        fetch(url, requestConfig)
            .then((response) => response.json())
            .then( async (responseData) => {
                Alert.alert('Er is een reset e-mail verzonden naar dit emailadres.');
            })
            .catch(error => {
                callback(false, null, { type: SERVER_ERROR })
            })
            .done();
    },

    requestRegister(url, data, callback) {
        let requestConfig = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password,
                dayOfBirth: data.age,
                name: data.username,
            })
        }

        fetch(url, requestConfig)
            .then((response) => response.json())
            .then( async (responseData) => {
                const token = await AsyncStorage.getItem('token');
                if (!token){Actions.login();}
            })
            .catch(error => {
                callback(false, null, { type: SERVER_ERROR })
            })
            .done();
    },

    saveDataAsyncStorage: async function(responseData){
        if (responseData.token && responseData.userId){
            await AsyncStorage.multiSet([
                ["token", responseData.token],
                ["userId", responseData.userId]
            ])
            const token = await AsyncStorage.getItem('token');
            if (token){Actions.home();}
        }
    },
}

module.exports = AuthAPI;
