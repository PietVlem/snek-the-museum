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
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography'

import RichEditor from "../rich-editor";

import { FStorage, Firebase } from '../../../../firebase';

const styles = {
  selectCategories: {
    minWidth: 240,
    marginBottom: 30
  },
  textFields: {
    marginBottom: 30
  },
};

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firebaseImage: null,
      photoId: null,
      checkedValues: []
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
        name: "museum",
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
                photoId: responseJson.id
            });
        }
    } catch(error) {
        console.log(error);
    }
}

  handleCheck(e, x) {
    this.setState(state => ({
      checkedValues: state.checkedValues.includes(x)
        ? state.checkedValues.filter(c => c !== x)
        : [...state.checkedValues, x]
    }));
  }

  render() {
    const {
      values: {
        title,
        body,
        categoryId,
        photoId,
        openingHours,
        streetAndNumber,
        zipcodeId,
        longitude,
        latitude,
        disabilityIds,
        website,
        telephone,
        facebook,
        twitter,
        mail
      },
      errors,
      touched,
      handleChange,
      handleSubmit,
      isValid,
      setFieldTouched,
      categories,
      zipcodes,
      disabilities,
      classes,
      setFieldValue
    } = this.props;

    return (
      <form
        onSubmit={(e) => {
          this.props.values.photoId = this.state.photoId;
          this.props.values.disabilityIds = this.state.checkedValues;
          this.props.handleSubmit(e);
        }}
        method="POST"
      >
        <TextField
          className={classes.textFields}
          id="title"
          name="title"
          helperText={touched.title ? errors.title : ""}
          error={touched.title && Boolean(errors.title)}
          label="Title"
          value={title}
          onChange={this.change.bind(null, "title")}
          fullWidth
        />

        <div className="process">
          <h4>image uplaod</h4>
          <input type="file" className="process_btn-upload" onChange={(e) => this.uploadImage(e)} />
          <img src={this.state.firebaseImage} alt="upload-image" className="process__image" />
        </div>

        <TextField
          className={classes.textFields}
          id="body"
          name="body"
          helperText={touched.body ? errors.body : ""}
          error={touched.body && Boolean(errors.body)}
          label="Body"
          fullWidth
          multiline
          rows="10"
          value={body}
          onChange={this.change.bind(null, "body")}

        />

        <FormControl>
          <InputLabel htmlFor="categoryId">Category</InputLabel>
          <Select
            className={classes.selectCategories}
            value={categoryId}
            onChange={this.change.bind(null, "category")}
            inputProps={{
              name: 'categoryId',
              id: 'categoryId',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {categories && categories.map((category, index) => (
              <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          className={classes.textFields}
          id="openingHours"
          name="openingHours"
          helperText={touched.openingHours ? errors.openingHours : ""}
          error={touched.openingHours && Boolean(errors.openingHours)}
          label="Opening Hours"
          fullWidth
          value={openingHours}
          onChange={this.change.bind(null, "openingHours")}
        />

        <TextField
          className={classes.textFields}
          id="streetAndNumber"
          name="streetAndNumber"
          helperText={touched.streetAndNumber ? errors.streetAndNumber : ""}
          error={touched.openingHours && Boolean(errors.openingHours)}
          label="street and Number"
          fullWidth
          value={streetAndNumber}
          onChange={this.change.bind(null, "streetAndNumber")}
        />

        <FormControl>
          <InputLabel htmlFor="categoryId">Zipcode</InputLabel>
          <Select
            className={classes.selectCategories}
            value={zipcodeId}
            onChange={this.change.bind(null, "zipcodeId")}
            inputProps={{
              name: 'zipcodeId',
              id: 'zipcodeId',
            }}
          >
            {zipcodes && zipcodes.map((zipcode, index) => (
              <MenuItem key={zipcode.id} value={zipcode.id}>{zipcode.code} {zipcode.city}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          className={classes.textFields}
          id="longitude"
          name="longitude"
          helperText={touched.longitude ? errors.longitude : ""}
          error={touched.longitude && Boolean(errors.longitude)}
          label="Longitude"
          fullWidth
          value={longitude}
          onChange={this.change.bind(null, "longitude")}
        />

        <TextField
          className={classes.textFields}
          id="latitude"
          name="latitude"
          helperText={touched.latitude ? errors.latitude : ""}
          error={touched.latitude && Boolean(errors.latitude)}
          label="Latitude"
          fullWidth
          value={latitude}
          onChange={this.change.bind(null, "latitude")}
        />

        <FormControl>
          <Typography variant="h6" gutterBottom>Disabilities</Typography>
          {disabilities && disabilities.map((disability, index) => (
            <FormControlLabel
              key={disability.id}
              control={
                <Checkbox
                  onChange={e => this.handleCheck(e, disability.id)}
                  checked={this.state.checkedValues.includes(disability.id)}
                />
              }
              label={disability.name}
            />
          ))}
        </FormControl>

        <TextField
          className={classes.textFields}
          id="website"
          name="website"
          helperText={touched.website ? errors.website : ""}
          error={touched.website && Boolean(errors.website)}
          label="website"
          fullWidth
          value={website}
          onChange={this.change.bind(null, "website")}
        />

        <TextField
          className={classes.textFields}
          id="telephone"
          name="telephone"
          helperText={touched.telephone ? errors.telephone : ""}
          error={touched.telephone && Boolean(errors.telephone)}
          label="telephone"
          fullWidth
          value={telephone}
          onChange={this.change.bind(null, "telephone")}
        />

        <TextField
          className={classes.textFields}
          id="facebook"
          name="facebook"
          helperText={touched.facebook ? errors.facebook : ""}
          error={touched.facebook && Boolean(errors.facebook)}
          label="facebook"
          fullWidth
          value={facebook}
          onChange={this.change.bind(null, "facebook")}
        />

        <TextField
          className={classes.textFields}
          id="twitter"
          name="twitter"
          helperText={touched.twitter ? errors.twitter : ""}
          error={touched.twitter && Boolean(errors.twitter)}
          label="twitter"
          fullWidth
          value={twitter}
          onChange={this.change.bind(null, "twitter")}
        />

        <TextField
          className={classes.textFields}
          id="mail"
          name="mail"
          helperText={touched.mail ? errors.mail : ""}
          error={touched.mail && Boolean(errors.mail)}
          label="mail"
          fullWidth
          value={mail}
          onChange={this.change.bind(null, "mail")}
        />

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