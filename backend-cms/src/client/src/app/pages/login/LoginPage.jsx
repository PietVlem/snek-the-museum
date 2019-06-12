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

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: ''
    }
    this.signIn = this.signIn.bind(this);
  }

  componentWillMount() {
    if (localStorage.getItem('JWT') !== null) {
      window.location.href = 'http://localhost:3000/admin';
    }
  }

  handleChangeEmail(e) {
    this.setState({ email: e.target.value });
  }

  handleChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  signIn() {
    console.log('pressed...');
    fetch('http://127.0.0.1:8080/api/v1/signIn', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "email": this.state.email,
        "password": this.state.password,
      })
    }).then((response) => {
      return response.json();
    })
      .then( (data) => {
        console.log(data);
        if (data.isJoi === true){
          this.setState({ errorMessage: "oops, something when wrong :(" });
          return;
        }else if ( data.userRole === 'user'){
          this.setState({ errorMessage: "You are not allowed to login to this platform" });
          return;
        }else{
          const localData = {
            'JWT_token': data.token,
            'User_role': data.userRole
          }
          localStorage.setItem('snek_the_museums', JSON.stringify(localData));
          window.location.href = 'http://localhost:3000/admin';
        }
      })
      .catch(function (error) {
        // console.log(error);
        this.setState({ errorMessage: "oops, something when wrong :(" });
        return;
      });
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
            Sign in
          </Typography>
          <p>{this.state.errorMessage}</p>
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                id="email"
                name="email"
                autoComplete="email"
                autoFocus
                value={this.state.email}
                onChange={this.handleChangeEmail.bind(this)}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={this.state.password}
                onChange={this.handleChangePassword.bind(this)}
              />
            </FormControl>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.signIn}
            >
              Sign in
            </Button>
          </form>
        </Paper>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(LoginPage);