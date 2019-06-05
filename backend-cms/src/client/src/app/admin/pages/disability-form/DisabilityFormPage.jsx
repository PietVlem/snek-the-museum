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
import DisabilityForm from '../../components/disability-form';

class DisabilityFormPage extends Component {
  render() {
    const { id } = this.props.match.params;

    return (
      <Grid container spacing={24}>
          <Grid item xs={12}>
              {id ? (
              <DisabilityForm disabilityId={id} />
              ) : (
              <DisabilityForm />
              )}
          </Grid>
      </Grid>
    )
  }
}

export default (DisabilityFormPage);