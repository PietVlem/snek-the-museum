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
            values: { code, city, country, categoryId, },
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
                id="code"
                name="code"
                helperText={touched.code ? errors.code : ""}
                error={touched.code && Boolean(errors.code)}
                label="code"
                value={code}
                onChange={this.change.bind(null, "code")}
                fullWidth
              />

              <TextField
                id="city"
                name="city"
                helperText={touched.city ? errors.city : ""}
                error={touched.city && Boolean(errors.city)}
                label="City"
                value={city}
                onChange={this.change.bind(null, "city")}
                fullWidth
              />

              <TextField
                id="country"
                name="country"
                helperText={touched.country ? errors.country : ""}
                error={touched.country && Boolean(errors.country)}
                label="country"
                value={country}
                onChange={this.change.bind(null, "country")}
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