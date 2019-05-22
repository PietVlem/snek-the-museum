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
import ExhibitionForm from '../../components/exhibition-form';

class ExhibitionFormPage extends Component {
  render() {
    const { id } = this.props.match.params;

    return (
      <Grid container spacing={24}>
          <Grid item xs={12}>
              {id ? (
              <ExhibitionForm exhibitionId={id} />
              ) : (
              <ExhibitionForm />
              )}
          </Grid>
      </Grid>
    )
  }
}

export default (ExhibitionFormPage);