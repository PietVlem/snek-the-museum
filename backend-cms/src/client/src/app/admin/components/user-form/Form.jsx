/*
Import external libraries
*/
import React, { Component } from "react";
import PropTypes from 'prop-types';

/*
Material UI
*/
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from "@material-ui/core/TextField";

/*
Import internal libraries
*/
import { FStorage, Firebase } from '../../../../firebase';
import RichEditor from "../rich-editor";

const styles = {
    selectUserRole: {
        minWidth: 240,
        marginBottom: 30
    },
    textField: {
        marginBottom: 30
    },
    process: {
        marginBottom: 30
    }
};

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firebaseImage: null,
            avatarId: null
        }
    }

    static propTypes = {
        classes: PropTypes.object.isRequired,
    }

    change = (name, e) => {
        e.persist();
        this.props.handleChange(e);
        this.props.setFieldTouched(name, true, false);
    };

    setDefaultImage() {
        this.setState({
            firebaseImage: null
        })
    }

    uploadImage(e) {
        let currentImageName = "firebase-image-" + Date.now();
        let uploadImage = FStorage.ref(`images/${currentImageName}`).put(e.target.files[0]);
        uploadImage.on('state_changed',
            (snapshot) => { },
            (error) => {
                alert(error)
            },
            () => {
                // store image in firebase
                FStorage.ref('images').child(currentImageName).getDownloadURL().then(url => {
                    this.setState({
                        firebaseImage: url
                    });
                    this.saveImageToMongoDb(url);
                    //console.log(url);
                })
            }
        )
    }

    saveImageToMongoDb= async(imageUrl) => {
        const data = {
            name: "avatar",
            url: imageUrl
        }
        try {
            const options = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    //'Authorization': JWT_token,
                },
                body: JSON.stringify(data),
                mode: 'cors',
                cache: 'default'
            };

            const response = await fetch('/api/v1/images', options);
            const responseJson = await response.json();
            if (responseJson) {
                console.log(responseJson);
                this.setState({
                    avatarId: responseJson.id
                });
            }
        } catch(error) {
            console.log(error);
        }
    }

    render() {
        const {
            values: { 
                email, 
                password, 
                name, 
                dayOfBirth, 
                userRole, 
                avatar 
            },
            errors,
            touched,
            handleChange,
            handleSubmit,
            isValid,
            setFieldTouched,
            categories,
            classes
        } = this.props;

        return (
            <form
                onSubmit={(e) => {
                    this.props.values.avatar = this.state.avatarId;
                    this.props.handleSubmit(e);
                }}
                method="POST"
            >

                <TextField
                    className={classes.textField}
                    id="email"
                    name="email"
                    helperText={touched.email ? errors.email : ""}
                    error={touched.email && Boolean(errors.email)}
                    label="email"
                    value={email}
                    onChange={this.change.bind(null, "email")}
                    fullWidth
                />

                <TextField
                    className={classes.textField}
                    id="password"
                    name="password"
                    helperText={touched.password ? errors.password : ""}
                    error={touched.password && Boolean(errors.password)}
                    label="password"
                    value={password}
                    onChange={this.change.bind(null, "password")}
                    fullWidth
                />

                <TextField
                    className={classes.textField}
                    id="name"
                    name="name"
                    helperText={touched.name ? errors.name : ""}
                    error={touched.name && Boolean(errors.name)}
                    label="name"
                    value={name}
                    onChange={this.change.bind(null, "name")}
                    fullWidth
                />

                <TextField
                    className={classes.textField}
                    id="dayOfBirth"
                    name="dayOfBirth"
                    helperText={touched.dayOfBirth ? errors.dayOfBirth : ""}
                    error={touched.dayOfBirth && Boolean(errors.dayOfBirth)}
                    label="dayOfBirth"
                    value={dayOfBirth}
                    onChange={this.change.bind(null, "dayOfBirth")}
                    fullWidth
                />

                <FormControl>
                    <InputLabel >User Role</InputLabel>
                    <Select
                        className={classes.selectUserRole}
                        value={userRole}
                        onChange={this.change.bind(null, "userRole")}
                        inputProps={{
                            name: 'userRole',
                            id: 'userRole',
                        }}
                    >
                        <MenuItem key="user" value="user">User</MenuItem>
                        <MenuItem key="museum" value="museum">Museum</MenuItem>
                        <MenuItem key="admin" value="admin">System admin</MenuItem>
                    </Select>
                </FormControl>

                <div className={classes.process}>
                    <h4>Avatar</h4>
                    <input type="file" className="process_btn-upload" onChange={(e) => this.uploadImage(e)} />
                    <img src={this.state.firebaseImage} alt="upload-image" className="process__image" />
                </div>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={!isValid}
                >
                    Submit
              </Button>
            </form>
        );
    }
}

export default withStyles(styles)(Form);