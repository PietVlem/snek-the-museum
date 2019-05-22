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
import ZipcodesTablePage from '../zipcodes-table';
import ZipcodeFormPage from '../zipcode-form';

const tabs = [
  { id: 'List', link: '/admin/zipcodes' },
  { id: 'Create new zipcode', link: '/admin/zipcodes/create' },
];

class ZipcodesOverviewPage extends Component {
  render() {
    const { children } = this.props;

    return (
      <ContentLayout title="Zipcodes Overview" tabs={tabs}>
        { children }
        <Route exact path="/admin/zipcodes" component={ ZipcodesTablePage }></Route>
        <Route path="/admin/zipcodes/create" component={ ZipcodeFormPage }></Route>
        <Route path="/admin/zipcodes/:id/edit" component={ ZipcodeFormPage }></Route>
      </ContentLayout>
    )
  }
}

export default (ZipcodesOverviewPage);