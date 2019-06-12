/*
Import extenal libraries
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

/*
Material UI
*/
import Grid from '@material-ui/core/Grid';

/* 
Dotenv
*/
import dotenv from 'dotenv';
dotenv.config();

/*
Components
*/

/*
Styling
*/
const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

class PasswordResetPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newPassword: '',
            confirmPassword: '',
            errorMessage: ''
        }
        this.resetPassword = this.resetPassword.bind(this);
    }


    handleChangeNewPassword(e) {
        this.setState({ newPassword: e.target.value });
    }

    handleChangeConfrimPassword(e) {
        this.setState({ confirmPassword: e.target.value });
    }

    resetPassword() {
        console.log('clicky');
        if (this.state.newPassword == this.state.confirmPassword) {
            console.log('the same (;');
            fetch(`http://127.0.0.1:8080/api/v1/reset/${this.props.match.params.id}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "password": this.state.newPassword,
                })
            }).then((response) => {
                return response.json();
            }).then((data) => {
                if (data.isJoi === true){
                    this.setState({ errorMessage: "oops, something when wrong :(" });
                    return;
                }else{
                    this.setState({ errorMessage: "Password has been updated. You can log in now" });
                    return;
                }
             })
        } else {
            this.setState({ errorMessage: "Passwords do not match" });
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Reset Password
          </Typography>
                    <p>{this.state.errorMessage}</p>
                    <form className={classes.form}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">New password</InputLabel>
                            <Input
                                id="newPassword"
                                name="newPassword"
                                type="password"
                                autoFocus
                                value={this.state.newPassword}
                                onChange={this.handleChangeNewPassword.bind(this)}
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Repeat new password</InputLabel>
                            <Input
                                name="password"
                                type="password"
                                id="password"
                                value={this.state.confirmPassword}
                                onChange={this.handleChangeConfrimPassword.bind(this)}
                            />
                        </FormControl>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.resetPassword}
                        >
                            Reset Password
            </Button>
                    </form>
                </Paper>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(PasswordResetPage);