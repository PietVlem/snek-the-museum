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
    name: Yup.string("Enter a name").required("Name is required").max(128),
    description: Yup.string("Enter a description").required(true).max(512),
    slug: Yup.string("Enter a slug").required(true),
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

class CategorieForm extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    }
    
    state = {
        categories: [],
        category: { name: "", description: "", slug: "" },
    };

    componentWillMount() {
        this.loadCategories();
        
        if (this.props.categoryId) {            
            this.loadCategorie(this.props.categoryId);
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

    loadCategorie = async (categoryId) => {
        try {
            const options = {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            };

            const response = await fetch(`/api/v1/categories/${categoryId}`, options);
            const responseJson = await response.json();
            if (responseJson) {
                this.setState(prevState => ({ 
                    ...prevState, 
                    category: responseJson 
                }));
            }
        } catch(error) {
            console.log(error);
        }
    }

    submit = (values, actions) => {
        const { categoryId } = this.props;

        if (categoryId) {  
            this.updateCategorie(categoryId, values); 
            this.refs.notificationEdit.handleClick();         
        } else {
            this.saveCategorie(values);
            this.refs.notificationCreate.handleClick();
        }
        
    }

    saveCategorie = async (categoryData) => {
        try {
            const options = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(categoryData),
                mode: 'cors',
                cache: 'default'
            };

            const response = await fetch('/api/v1/categories', options);
            const responseJson = await response.json();
            if (responseJson) {
                console.log(responseJson);
            }
        } catch(error) {
            console.log(error);
        }
    }

    updateCategorie = async (categoryId, categoryData) => {
        try {
            const options = {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(categoryData),
                mode: 'cors',
                cache: 'default'
            };

            const response = await fetch(`/api/v1/categories/${categoryId}`, options);
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
        const { category:values } = this.state;

        console.log(values);

        return (
            <React.Fragment>
                <div className={classes.container}>
                    <Paper className={classes.paper}>
                        <Formik
                            render={props => <Form {...props} categories={this.state.categories} />}
                            initialValues={values}
                            validationSchema={validationSchema}
                            onSubmit={(values, actions) => this.submit(values, actions)}
                            enableReinitialize={true}
                        />
                    </Paper>
                </div>
                <Snackbardefault ref={"notificationCreate"} message={"Category created!"}/>
                <Snackbardefault ref={"notificationEdit"} message={"Category edited!"}/>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(CategorieForm);