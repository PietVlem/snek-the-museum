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
Import internal libraries
*/
import Snackbardefault from '../../components/notifications';

/*
Custom Form
*/
import Form from "./Form";

/*
Validation
*/
const validationSchema = Yup.object(
{
    title: Yup.string("Enter a title").required("Title is required").max(128),
    body: Yup.string("Enter a story").min(256),
    categoryId: Yup.string("Select a category"),
    photoId: Yup.string("Enter a photoId"),
    openingHours: Yup.string("Enter opening hours").required("Opening Hours are required"),
    streetAndNumber: Yup.string("Enter street and number").required("Street and number are required"),
    zipcodeId: Yup.string("Enter a Zipcode").required("Zipcode is required"),
    longitude: Yup.number("Enter the longitude of the museum").required("the logitude is required"),
    latitude: Yup.number("Enter the latitude of the museum").required("the latitude is required"),
    website: Yup.string("Enter a website"),
    telephone: Yup.string("Enter a telephone number"),
    facebook: Yup.string("Enter a facebook url"),
    twitter: Yup.string("Enter a twitter url"),
    mail: Yup.string().email(),
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

class MuseumForm extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    }
    
    state = {
        categories: [],
        zipcodes: [],
        disabilities: [],
        museum: { 
            title: "",
            body: "",
            categoryId: "",
            photoId: "",
            openingHours: "",
            streetAndNumber: "",
            zipcodeId: "",
            longitude: "",
            latitude: "",
            disabilityIds: [],
            website: "",
            telephone: "",
            facebook: "",
            twitter: "",
            mail: "",
        },
        photoUrl: ""
    };

    componentWillMount() {
        this.loadCategories();
        this.loadZipcodes();
        this.loaddisabilities();
        
        if (this.props.museumId) {            
            this.loadMuseum(this.props.museumId);
        }
    }

    loadCategories = async () => {
        try {
            const options = {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            };

            const response = await fetch('/api/v1/categories', options);
            console.log(response);
            const responseJson = await response.json();
            if (responseJson) {
                this.setState(prevState => ({ 
                    ...prevState, 
                    categories: responseJson 
                }));
            }
        } catch(error) {
            console.log(error);
        }
    }

    loadZipcodes = async () => {
        try {
            const options = {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            };

            const response = await fetch('/api/v1/zipcodes', options);
            console.log(response);
            const responseJson = await response.json();
            if (responseJson) {
                this.setState(prevState => ({ 
                    ...prevState, 
                    zipcodes: responseJson 
                }));
            }
        } catch(error) {
            console.log(error);
        }
    }

    loaddisabilities = async () => {
        try {
            const options = {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            };

            const response = await fetch('/api/v1/disabilities', options);
            console.log(response);
            const responseJson = await response.json();
            if (responseJson) {
                this.setState(prevState => ({ 
                    ...prevState, 
                    disabilities: responseJson 
                }));
            }
        } catch(error) {
            console.log(error);
        }
    }

    loadMuseum = async (museumId) => {
        try {
            const options = {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            };

            const response = await fetch(`/api/v1/museums/${museumId}`, options);
            const responseJson = await response.json();
            if (responseJson) {
                this.setState(prevState => ({ 
                    ...prevState, 
                    museum: responseJson,
                    photoUrl: responseJson.photo.url
                }));
            }
        } catch(error) {
            console.log(error);
        }
    }

    submit = async (values, actions) => {
        console.log(values);

        const LoggedInUser = await JSON.parse(localStorage.getItem('snek_the_museum'));
        const JWTLoggedInUser = LoggedInUser.JWT_token;
        
        const { museumId } = this.props;

        if (museumId) {  
            this.updateMuseum(museumId, values, JWTLoggedInUser);
            this.refs.notificationEdit.handleClick();        
        } else {
            this.saveMuseum(values, JWTLoggedInUser);
            this.refs.notificationCreate.handleClick();
        }
    }

    saveMuseum = async (museumData, JWT_token) => {
        try {
            const options = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': JWT_token,
                },
                body: JSON.stringify(museumData),
                mode: 'cors',
                cache: 'default'
            };

            const response = await fetch('/api/v1/museums', options);
            const responseJson = await response.json();
            if (responseJson) {
                console.log(responseJson);
            }
        } catch(error) {
            console.log(error);
        }
       console.log(museumData);
    }

    updateMuseum = async (museumId, museumData, JWT_token) => {
        try {
            const options = {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': JWT_token,
                },
                body: JSON.stringify(museumData),
                mode: 'cors',
                cache: 'default'
            };

            const response = await fetch(`/api/v1/museums/${museumId}`, options);
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
        const { museum:values } = this.state;

        console.log(values);

        return (
            <React.Fragment>
                <div className={classes.container}>
                    <Paper className={classes.paper}>
                        <Formik
                            render={props => <Form {...props} photoUrl={this.state.photoUrl} categories={this.state.categories} zipcodes={this.state.zipcodes} disabilities={this.state.disabilities}/>}
                            initialValues={values}
                            validationSchema={validationSchema}
                            onSubmit={(values, actions) => this.submit(values, actions)}
                            enableReinitialize={true}
                        />
                    </Paper>
                </div>
                <Snackbardefault ref={"notificationCreate"} message={"Museum created!"}/>
                <Snackbardefault ref={"notificationEdit"} message={"Museum edited!"}/>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(MuseumForm);