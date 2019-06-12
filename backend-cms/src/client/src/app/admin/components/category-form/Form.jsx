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

const styles = {
  selectCategories: {
    minWidth: 240
  },
  textFields: {
    marginBottom: 30
  }
};

class Form extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  change = (name, e) => {
    e.persist();
    this.props.handleChange(e);
    this.props.setFieldTouched(name, true, false);
  };

  render() {
    const {
      values: { name, description, slug },
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
          this.props.handleSubmit(e);
        }}
        method="POST"
      >
        <TextField
          className={classes.textFields}
          id="name"
          name="name"
          helperText={touched.title ? errors.title : ""}
          error={touched.name && Boolean(errors.name)}
          label="Name"
          value={name}
          onChange={this.change.bind(null, "name")}
          fullWidth

        />
        <TextField
          className={classes.textFields}
          id="description"
          name="description"
          helperText={touched.description ? errors.description : ""}
          error={touched.description && Boolean(errors.description)}
          label="Description"
          fullWidth
          multiline
          rows="4"
          value={description}
          onChange={this.change.bind(null, "description")}
        />
        <TextField
          className={classes.textFields}
          id="slug"
          name="slug"
          helperText={touched.title ? errors.title : ""}
          error={touched.slug && Boolean(errors.slug)}
          label="Slug"
          value={slug}
          onChange={this.change.bind(null, "slug")}
          fullWidth
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