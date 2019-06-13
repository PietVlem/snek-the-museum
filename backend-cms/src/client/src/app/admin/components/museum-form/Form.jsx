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

import RichEditor from "../rich-editor";

import { FStorage, Firebase } from '../../../../firebase';

const styles = {
  selectCategories: {
    minWidth: 240
  }
};

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firebaseImage: null,
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

  uploadImage = async (e) => {
    let currentImageName = "firebase-image-" + Date.now();
    let uploadImage = await FStorage.ref(`images/${currentImageName}`).put(e.target.files[0]);
    await uploadImage.on('state_changed',
      (snapshot) => { },
      (error) => {
        alert(error)
      },
      () => {
        // --> 1: store image in firebase
        FStorage.ref('images').child(currentImageName).getDownloadURL().then((url) => {
          this.setState({
            firebaseImage: url
          });
          
        })
      }
    )
  }

  render() {
    const {
      values: { title, file, body, categoryId },
      errors,
      touched,
      handleChange,
      handleSubmit,
      isValid,
      setFieldTouched,
      categories,
      classes,
      setFieldValue
    } = this.props;

    return (
      <form
        onSubmit={(e) => {
          this.props.handleSubmit(e);
        }}
        method="POST"
      >
        <TextField
          id="title"
          name="title"
          helperText={touched.title ? errors.title : ""}
          error={touched.title && Boolean(errors.title)}
          label="Title"
          value={title}
          onChange={this.change.bind(null, "title")}
          fullWidth
        />

        <input id="file" name="file" type="file" onChange={(event) => {
          setFieldValue("file", event.currentTarget.files[0]);
        }} className="form-control" />

        <div className="process">
          <h4>image uplaod</h4>
          <input type="file" className="process_btn-upload" onChange={(e) => this.uploadImage(e)} />
          <img src="{this.state.firebaseImage}" alt="upload-image" className="process__image" />
        </div>

        <TextField
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