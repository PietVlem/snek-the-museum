/*
Import external libraries
*/
import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Formik } from "formik";
import * as Yup from 'yup';
import { EditorState } from 'draft-js';

/*
Material UI
*/
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";

/*
Custom Form
*/
import Form from "./Form";

/*
Validation
*/
const validationSchema = Yup.object(
{
    email: Yup.string("Enter a email").required("Email is required"),
    password: Yup.string("Enter a city").required("password is required"),
    name: Yup.string("Enter a county").required("name is required"),
    dayOfBirth: Yup.date("Enter a date"),
    userRole: Yup.string("select a user role").required("User role is required"),
});

/*
Styling
*/
const styles = theme => ({
 paper: {
   marginTop: theme.spacing.unit * 8,
   display: "flex",
   flexDirection: "column",
   alignItems: "center",
   padding: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 5}px ${theme
     .spacing.unit * 5}px`
 },
 container: {
   
 }
});

class UserForm extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    }
    
    state = {
        user: { email: "", password: "", name: "", dayOfBirth: "", userRole: "", avatar: "" },
    };

    componentWillMount() {        
        if (this.props.userId) {            
            this.loadUser(this.props.userId);
        }
    }

    loadUser = async (userId) => {
        try {
            const options = {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            };

            const response = await fetch(`/api/v1/users/${userId}`, options);
            const responseJson = await response.json();
            if (responseJson) {
                this.setState(prevState => ({ 
                    ...prevState, 
                    user: responseJson 
                }));
            }
        } catch(error) {
            console.log(error);
        }
    }

    submit = async (values, actions) => {
        const LoggedInUser = await JSON.parse(localStorage.getItem('snek_the_museum'));
        const JWTLoggedInUser = LoggedInUser.JWT_token;

        const { userId } = this.props;

        if (userId) {  
            this.updateUser(userId, JWTLoggedInUser, values);          
        } else {
            this.saveUser(values, JWTLoggedInUser);
        }
    }

    saveUser = async (userData, JWT_token) => {
        try {
            const options = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': JWT_token,
                },
                body: JSON.stringify(userData),
                mode: 'cors',
                cache: 'default'
            };

            const response = await fetch('/api/v1/users', options);
            const responseJson = await response.json();
            if (responseJson) {
                console.log(responseJson);
            }
        } catch(error) {
            console.log(error);
        }
    }

    updateUser = async (userId, JWT_token, userData) => {
        try {
            const options = {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': JWT_token,
                },
                body: JSON.stringify(userData),
                mode: 'cors',
                cache: 'default'
            };

            const response = await fetch(`/api/v1/users/${userId}`, options);
            const responseJson = await response.json();
            if (responseJson) {
                console.log(responseJson);
            }
        } catch(error) {
            console.log(error);
        }
    }

    render() {
        const { classes } = this.props;
        const { user:values } = this.state;

        console.log(values);

        return (
            <React.Fragment>
                <div className={classes.container}>
                    <Paper className={classes.paper}>
                        <Formik
                            render={props => <Form {...props}/>}
                            initialValues={values}
                            validationSchema={validationSchema} 
                            onSubmit={(values, actions) => this.submit(values, actions)}
                            enableReinitialize={true}
                        />
                    </Paper>
                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(UserForm);