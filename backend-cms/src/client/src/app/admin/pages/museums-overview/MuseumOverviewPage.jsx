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
import MuseumsTablePage from '../museums-table';
import MuseumFormPage from '../museum-form';

const tabs = [
  { id: 'List', link: '/admin/museums' },
  { id: 'Create new museums', link: '/admin/museums/create' },
];

class MuseumsOverviewPage extends Component {
  render() {
    const { children } = this.props;

    return (
      <ContentLayout title="Museums Overview" tabs={tabs}>
        { children }
        <Route exact path="/admin/museums" component={ MuseumsTablePage }></Route>
        <Route path="/admin/museums/create" component={ MuseumFormPage }></Route>
        <Route path="/admin/museums/:id/edit" component={ MuseumFormPage }></Route>
      </ContentLayout>
    )
  }
}

export default (MuseumsOverviewPage);