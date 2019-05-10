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
import CategoriesTable from '../../components/categories-table';

class CategoriesTablePage extends Component {
  render() {
    return (
      <Grid container spacing={24}>
          <Grid item xs={12}>
              <CategoriesTable />
          </Grid>
      </Grid>
    )
  }
}

export default (CategoriesTablePage);