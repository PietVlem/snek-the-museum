

'use strict';

import React, {Component} from 'react';
var { View, Text } = require('react-native');

import {Actions} from 'react-native-router-flux';

import { Button, NavBar, AuthTextInput } from '../index';

import styles from '../../styles/auth'

export class Authentication extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            email: "",
            password: "",
            error: {username:"", email:"", password: "", general:""},

        };
    }

    render() {

        var title = "Register";
        if (this.props.login) title = "LOGIN";
        else if (this.props.recover) title = "Recover Password";

        return (
            <View style={styles.wrapper}>
                <View style={styles.container}>
                    <Text style={[styles.errorText]}>{this.state.error['general']}</Text>

                    {//if the container type is Register, show the
                        // username input
                        (this.props.register) &&
                        <AuthTextInput
                            onChangeText={(text) => this.setState({username: text})}
                            placeholder={"Username"}
                            autoFocus={true}
                            value={this.state.username}
                            error={this.state.error['username']}
                            secureTextEntry={false}
                        />
                    }

                    <AuthTextInput
                        onChangeText={(text) => this.setState({email: text})}
                        placeholder={"Emailadres"}
                        autoFocus={false}
                        value={this.state.email}
                        error={this.state.error['email']}
                        secureTextEntry={false}
                    />

                    {//if the container type is not Recover Password, show the password input
                        (!this.props.recover) &&
                        <AuthTextInput
                            onChangeText={(text) => this.setState({password: text})}
                            placeholder={"Paswoord"}
                            autoFocus={false}
                            value={this.state.password}
                            error={this.state.error['password']}
                            secureTextEntry={true}
                        />
                    }


                    {//if the container type is Login, show the forgot password text
                        (this.props.login) &&
                        <Text style={[styles.forgotText]} onPress={Actions.password}>{"paswoord vergeten?"}</Text>
                    }

                    <Button onPress={this.submit.bind(this)}
                            btnText={(this.props.recover) ? "Submit" : title}/>

                </View>
            </View>
        );
    }

    submit() {
        var state = this.state;
        var error = state.error;
        var errCount = 0;

        if (state.email.length <= 0) errCount++; //check email first
        error["email"] = (state.email.length <= 0) ? "Your email is required!" : "";

        if (!this.props.recover) {
            if (state.password.length <= 0 || state.password.length < 6) {
                error["password"] = "Password should be Min 6 characters";
                errCount++;
            }else{
                error["password"] = "";
            }

            if (this.props.register) {//if register, check username
                if (state.username.length <= 0) errCount++;
                error["username"] = (state.username.length <= 0) ? "Your username is required" : "";
            }
        }

        this.setState({error: error});

        if (errCount <= 0) {
            var data = {
                username: state.username,
                email:state.email,
                password: state.password,
            }

            this.props.onPress(data, this.errorCB.bind(this));
        }
    }

    errorCB(err) {
        var error = this.state.error;

        if (err.username) error["username"] = err.username;
        else if (err.email) error["email"] = err.email;
        else error["general"] = err;

        this.setState({error: error});
    }
};