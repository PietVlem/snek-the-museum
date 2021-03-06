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
import BlogsTable from '../../components/blogs-table';

class BlogsTablePage extends Component {
  render() {
    return (
      <Grid container spacing={24}>
          <Grid item xs={12}>
              <BlogsTable />
          </Grid>
      </Grid>
    )
  }
}

export default (BlogsTablePage);