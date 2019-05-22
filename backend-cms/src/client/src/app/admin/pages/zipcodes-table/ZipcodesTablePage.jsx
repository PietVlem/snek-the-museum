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
import ZipcodesTable from '../../components/zipcodes-table';

class ZipcodesTablePage extends Component {
  render() {
    return (
      <Grid container spacing={24}>
          <Grid item xs={12}>
              <ZipcodesTable />
          </Grid>
      </Grid>
    )
  }
}

export default (ZipcodesTablePage);