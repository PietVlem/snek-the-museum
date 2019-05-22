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
import DisabilitiesTable from '../../components/disabilities-table';

class DisabilitiesTablePage extends Component {
  render() {
    return (
      <Grid container spacing={24}>
          <Grid item xs={12}>
              <DisabilitiesTable />
          </Grid>
      </Grid>
    )
  }
}

export default (DisabilitiesTablePage);