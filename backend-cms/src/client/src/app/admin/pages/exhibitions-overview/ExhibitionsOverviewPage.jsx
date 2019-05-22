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
import ExhibitionsTablePage from '../exhibitions-table';
import ExhibitionFormPage from '../exhibition-form';

const tabs = [
  { id: 'List', link: '/admin/exhibitions' },
  { id: 'Create a new exhibition', link: '/admin/exhibitions/create' },
];

class ExhibitionsOverviewPage extends Component {
  render() {
    const { children } = this.props;

    return (
      <ContentLayout title="Exhibitions Overview" tabs={tabs}>
        { children }
        <Route exact path="/admin/exhibitions" component={ ExhibitionsTablePage }></Route>
        <Route path="/admin/exhibitions/create" component={ ExhibitionFormPage }></Route>
        <Route path="/admin/exhibitions/:id/edit" component={ ExhibitionFormPage }></Route>
      </ContentLayout>
    )
  }
}

export default (ExhibitionsOverviewPage);