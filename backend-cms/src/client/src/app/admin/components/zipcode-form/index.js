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
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

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
        code: Yup.string("Enter a zipcode").required("Zipcode is required"),
        city: Yup.string("Enter a city").required("City is required"),
        country: Yup.string("Enter a county").required("City is required"),
    }
);

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

    },
    green: {
        backgroundColor: '#3b953e',
    },
});

class ZipcodeForm extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    }

    state = {
        zipcode: { code: "", city: "", country: "" },
    };

    componentWillMount() {
        if (this.props.zipcodeId) {
            this.loadZipcode(this.props.zipcodeId);
        }
    }

    loadZipcode = async (zipcodeId) => {
        try {
            const options = {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            };

            const response = await fetch(`/api/v1/zipcodes/${zipcodeId}`, options);
            const responseJson = await response.json();
            if (responseJson) {
                this.setState(prevState => ({
                    ...prevState,
                    zipcode: responseJson
                }));
            }
        } catch (error) {
            console.log(error);
        }
    }

    submit = (values, actions) => {
        const { zipcodeId } = this.props;
        console.log(values);

        if (zipcodeId) {
            this.updateZipcode(zipcodeId, values);
            this.refs.notificationEdit.handleClick();
        } else {
            this.saveZipcode(values);
            this.refs.notificationCreate.handleClick();
        }

    }

    saveZipcode = async (zipcodeData) => {
        try {
            const options = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(zipcodeData),
                mode: 'cors',
                cache: 'default'
            };

            const response = await fetch('/api/v1/zipcodes', options);
            const responseJson = await response.json();
            if (responseJson) {
                console.log(responseJson);
            }
        } catch (error) {
            console.log(error);
        }
    }

    updateZipcode = async (zipcodeId, zipcodeData) => {
        try {
            const options = {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(zipcodeData),
                mode: 'cors',
                cache: 'default'
            };

            const response = await fetch(`/api/v1/zipcodes/${zipcodeId}`, options);
            const responseJson = await response.json();
            if (responseJson) {
                console.log(responseJson);
            }
        } catch (error) {
            console.log(error);
        }
    }

    accesChild = () => {
        this.refs.notification.handleClick()
      }

    render() {
        const { classes } = this.props;
        const { zipcode: values } = this.state;

        return (
            <React.Fragment>
                <div className={classes.container}>
                    <Paper className={classes.paper}>
                        <Formik
                            render={props => <Form {...props} />}
                            initialValues={values}
                            validationSchema={validationSchema}
                            onSubmit={(values, actions) => this.submit(values, actions)}
                            enableReinitialize={true}
                        />
                    </Paper>
                </div>
                <Snackbardefault ref={"notificationCreate"} message={"Zipcode created!"}/>
                <Snackbardefault ref={"notificationEdit"} message={"Zipcode edited!"}/>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(ZipcodeForm);