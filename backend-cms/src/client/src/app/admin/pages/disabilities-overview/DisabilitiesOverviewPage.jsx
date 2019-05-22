/*
Import extenal libraries
*/
import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';

/*
Layout
*/
import { ContentLayout } from '../../layouts';

/*
Pages
*/
import DisabilitiesTablePage from '../disabilities-table';
import DisabilityFormPage from '../disability-form';

const tabs = [
  { id: 'List', link: '/admin/disabilities' },
  { id: 'Create new disability', link: '/admin/disabilities/create' },
];

class DisabilitiesOverviewPage extends Component {
  render() {
    const { children } = this.props;

    return (
      <ContentLayout title="Disabilities Overview" tabs={tabs}>
        { children }
        <Route exact path="/admin/disabilities" component={ DisabilitiesTablePage }></Route>
        <Route path="/admin/disabilities/create" component={ DisabilityFormPage }></Route>
        <Route path="/admin/disabilities/:id/edit" component={ DisabilityFormPage }></Route>
      </ContentLayout>
    )
  }
}

export default (DisabilitiesOverviewPage);