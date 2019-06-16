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
        name: Yup.string("Enter a name").required("Name is required"),
        info: Yup.string("Enter info about the exhibiton").required(false).min(128),
        price: Yup.number("Enyter a price").required("Price is required"),
        duration: Yup.number("Enter a duration").required("Duration is required"),
        promocode: Yup.string("Enter a promocode").required("Promocode is required"),
        museumId: Yup.string("Select a museum").required(false),
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

class ExhibitionForm extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    }

    state = {
        museums: [],
        exhibiton: { name: '', exhibitionImage: '', info: '', price: '', duration: '', promocode: '', museumId: '' },
        photoUrl: ""
    };

    componentWillMount() {
        this.loadMuseums();

        if (this.props.exhibitionId) {
            this.loadExhibition(this.props.exhibitionId);
        }
    }

    loadMuseums = async () => {
        try {
            const options = {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            };

            const response = await fetch('/api/v1/museums', options);
            console.log(response);
            const responseJson = await response.json();
            if (responseJson) {
                this.setState(prevState => ({ 
                    ...prevState, 
                    museums: responseJson,
                    
                }));
            }
        } catch(error) {
            console.log(error);
        }
    }

    loadExhibition = async (exhibitonId) => {
        try {
            const options = {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            };

            const response = await fetch(`/api/v1/exhibitions/${exhibitonId}`, options);
            const responseJson = await response.json();
            if (responseJson) {
                this.setState(prevState => ({
                    ...prevState,
                    exhibiton: responseJson,
                    photoUrl: responseJson.eImage[0].url
                }));
                console.log(responseJson.eImage[0].url);
            }
        } catch (error) {
            console.log(error);
        }
    }

    submit = async (values, actions) => {
        console.log(values);

        const LoggedInUser = await JSON.parse(localStorage.getItem('snek_the_museum'));
        const JWTLoggedInUser = LoggedInUser.JWT_token;

        const { exhibitonId } = this.props;

        if (exhibitonId) {
            this.updateExhibition(exhibitonId, values, JWTLoggedInUser);
            this.refs.notificationEdit.handleClick();
        } else {
            this.saveExhibition(values, JWTLoggedInUser);
            this.refs.notificationCreate.handleClick();
        }

    }

    saveExhibition = async (exhibitionData, JWT_token) => {

        try {
            const options = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': JWT_token,
                },
                body: JSON.stringify(exhibitionData),
                mode: 'cors',
                cache: 'default'
            };

            const response = await fetch('/api/v1/exhibitions', options);
            const responseJson = await response.json();
            if (responseJson) {
                console.log(responseJson);
            }
        } catch (error) {
            console.log(error);
        }
    }

    updateExhibition = async (exhibitonId, exhibtionData, JWT_token) => {
        try {
            const options = {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': JWT_token,
                },
                body: JSON.stringify(exhibtionData),
                mode: 'cors',
                cache: 'default'
            };

            const response = await fetch(`/api/v1/exhibtions/${exhibitonId}`, options);
            const responseJson = await response.json();
            if (responseJson) {
                console.log(responseJson);
            }
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const { classes } = this.props;
        const { exhibiton: values } = this.state;

        console.log(values);

        return (
            <React.Fragment>
                <div className={classes.container}>
                    <Paper className={classes.paper}>
                        <Formik
                            render={props => <Form {...props} photoUrl={this.state.photoUrl} museums={this.state.museums} />}
                            initialValues={values}
                            validationSchema={validationSchema}
                            onSubmit={(values, actions) => this.submit(values, actions)}
                            enableReinitialize={true}
                        />
                    </Paper>
                </div>
                <Snackbardefault ref={"notificationCreate"} message={"Zipcode created!"} />
                <Snackbardefault ref={"notificationEdit"} message={"Zipcode edited!"} />
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(ExhibitionForm);