/*
Import extenal libraries
*/
import React, { Component } from 'react';

/*
Material UI
*/
import Grid from '@material-ui/core/Grid';

/*
Components
*/
import CategoryForm from '../../components/category-form';

class CategoryFormPage extends Component {
  render() {
    const { id } = this.props.match.params;

    return (
      <Grid container spacing={24}>
          <Grid item xs={12}>
              {id ? (
              <CategoryForm categorieId={id} />
              ) : (
              <CategoryForm />
              )}
          </Grid>
      </Grid>
    )
  }
}

export default (CategoryFormPage);