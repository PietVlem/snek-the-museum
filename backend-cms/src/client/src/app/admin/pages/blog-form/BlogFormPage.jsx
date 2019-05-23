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
import BlogForm from '../../components/blog-form';

class BlogFormPage extends Component {
  render() {
    const { id } = this.props.match.params;

    return (
      <Grid container spacing={24}>
          <Grid item xs={12}>
              {id ? (
              <BlogForm blogId={id} />
              ) : (
              <BlogForm />
              )}
          </Grid>
      </Grid>
    )
  }
}

export default (BlogFormPage);