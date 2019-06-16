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
  textFields: {
    marginBottom: 30
  },
  process: {
    marginBottom: 30
  },
  selectMuseums: {
    minWidth: 350,
    marginBottom: 30
  },
  processBtnUpload:{
    maxWidth: '100%',
    marginBottom: 30
  }
};

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firebaseImage: null,
      imageId: null
    }
  }
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  componentDidMount(){
    setTimeout(() => {
      console.log(this.props.photoUrl)
      if(this.props.photoUrl !== ""){
        this.setState({
          firebaseImage: this.props.photoUrl
        })
      }
    }, 2000);  
  }

  change = (name, e) => {
    e.persist();
    this.props.handleChange(e);
    this.props.setFieldTouched(name, true, false);
  };

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

  saveImageToMongoDb = async (imageUrl) => {
    const data = {
      name: "exhibtion image",
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
          imageId: responseJson.id
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const {
      values: { name, exhibitionImage, info, price, duration, promocode, museumId },
      errors,
      touched,
      handleChange,
      handleSubmit,
      isValid,
      setFieldTouched,
      museums,
      photoUrl,
      classes
    } = this.props;

    return (
      <form
        onSubmit={(e) => {
          this.props.values.exhibitionImage = this.state.imageId;
          this.props.handleSubmit(e);
        }}
        method="POST"
      >
        <TextField
          className={classes.textFields}
          id="name"
          name="name"
          helperText={touched.name ? errors.name : ""}
          error={touched.name && Boolean(errors.name)}
          label="name"
          value={name}
          onChange={this.change.bind(null, "name")}
          fullWidth
        />

        <div className={classes.process}>
          <h4>Exhibition-image</h4>
          <input type="file" className="process_btn-upload" onChange={(e) => this.uploadImage(e)} />
          <br/><br/>
          <img src={this.state.firebaseImage} alt="upload-image" className={classes.processBtnUpload} />
          <br/><br/>
        </div>

        <TextField
          className={classes.textFields}
          id="info"
          name="info"
          helperText={touched.info ? errors.info : ""}
          error={touched.info && Boolean(errors.info)}
          label="info"
          value={info}
          rows="10"
          onChange={this.change.bind(null, "info")}
          fullWidth
        />

        <TextField
          className={classes.textFields}
          id="price"
          name="price"
          helperText={touched.price ? errors.price : ""}
          error={touched.price && Boolean(errors.price)}
          label="price"
          value={price}
          onChange={this.change.bind(null, "price")}
          fullWidth
        />

        <TextField
          className={classes.textFields}
          id="duration"
          name="duration"
          helperText={touched.duration ? errors.duration : ""}
          error={touched.duration && Boolean(errors.duration)}
          label="duration"
          value={duration}
          onChange={this.change.bind(null, "duration")}
          fullWidth
        />

        <TextField
          className={classes.textFields}
          id="promocode"
          name="promocode"
          helperText={touched.info ? errors.info : ""}
          error={touched.info && Boolean(errors.info)}
          label="promocode"
          value={promocode}
          onChange={this.change.bind(null, "promocode")}
          fullWidth
        />

        <FormControl>
          <InputLabel htmlFor="museumId">Museum</InputLabel>
          <Select
            className={classes.selectMuseums}
            value={museumId}
            onChange={this.change.bind(null, "museum")}
            inputProps={{
              name: 'museumId',
              id: 'museumId',
            }}
          >
            {museums && museums.map((museum, index) => (
              <MenuItem key={museum.id} value={museum.id}>{museum.title}</MenuItem>
            ))}
          </Select>
        </FormControl>

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