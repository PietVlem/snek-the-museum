

 

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
            age: "",
            error: {username:"", email:"", password: "", general:"",age:""},

        };
    }

    render() {

        var title = "REGISTREREN";
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
                            placeholder={"Gebruikersnaam"}
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

                    {//if the container type is Register, show the
                        // age input
                        (this.props.register) &&
                        <AuthTextInput
                            onChangeText={(text) => this.setState({age: text})}
                            placeholder={"Geboortedatum"}
                            autoFocus={true}
                            value={this.state.age}
                            error={this.state.error['age']}
                            secureTextEntry={false}
                        />
                    }

                    {//if the container type is Login, show the forgot password text
                        (this.props.login) &&
                        <Text style={[styles.forgotText]} onPress={Actions.password}>{"paswoord vergeten?"}</Text>
                    }

                    <Button onPress={this.submit.bind(this)}
                            btnText={(this.props.recover) ? "RESET PASWOORD" : title}/>

                </View>
            </View>
        );
    }

    submit() {
        var state = this.state;
        var error = state.error;
        var errCount = 0;

        if (state.email.length <= 0) errCount++; //check email first
        error["email"] = (state.email.length <= 0) ? "Gelieve een emailadres in te geven." : "";

        if (!this.props.recover) {
            if (state.password.length <= 0 || state.password.length < 6) {
                error["password"] = "Het paswoord moet minstens 6 tekens bevatten.";
                errCount++;
            }else{
                error["password"] = "";
            }

            if (this.props.register) {//if register, check username
                if (state.username.length <= 0) errCount++;
                error["username"] = (state.username.length <= 0) ? "Gelieve een gebruikersnaam in te voeren" : "";
            }

            if (this.props.register) {//if register, check username
                if (state.age.length <= 0) errCount++;
                error["age"] = (state.age.length <= 0) ? "Gelieve een geboortedatum in te voeren" : "";
            }
        }

        this.setState({error: error});

        if (errCount <= 0) {
            var data = {
                age: state.age,
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
        else if (err.age) error["age"] = err.age;
        else error["general"] = err;

        this.setState({error: error});
    }
};