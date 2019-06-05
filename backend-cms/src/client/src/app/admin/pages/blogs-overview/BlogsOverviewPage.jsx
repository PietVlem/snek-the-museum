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
import BlogsTablePage from '../blogs-table';
import BlogFormPage from '../blog-form';

const tabs = [
  { id: 'List', link: '/admin/blogs' },
  { id: 'Create new blog', link: '/admin/blogs/create' },
];

class BlogsOverviewPage extends Component {
  render() {
    const { children } = this.props;

    return (
      <ContentLayout title="Blogs Overview" tabs={tabs}>
        { children }
        <Route exact path="/admin/blogs" component={ BlogsTablePage }></Route>
        <Route path="/admin/blogs/create" component={ BlogFormPage }></Route>
        <Route path="/admin/blogs/:id/edit" component={ BlogFormPage }></Route>
      </ContentLayout>
    )
  }
}

export default (BlogsOverviewPage);