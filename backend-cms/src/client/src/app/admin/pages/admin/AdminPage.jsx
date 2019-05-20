/*
Import extenal libraries
*/
import React, { Component } from 'react';
import { Route } from 'react-router-dom';

/*
Pages
*/
import BlogsOverviewPage from '../blogs-overview';
import CategoriesOverviewPage from '../categories-overview';
import PostsOverviewPage from '../posts-overview';
import MuseumsOverviewPage from '../museums-overview';

class AdminPage extends Component {
  render() {
    return (
      <div className="Admin">

        {/* to be done */}
        <Route path="/admin/users" component={MuseumsOverviewPage}></Route>
        <Route path="/admin/zipcodes" component={MuseumsOverviewPage}></Route>
        <Route path="/admin/exhibitions" component={MuseumsOverviewPage}></Route>
        <Route path="/admin/disabilities" component={MuseumsOverviewPage}></Route>
        <Route path="/admin/Assignments" component={MuseumsOverviewPage}></Route>
        
        {/* done */}
        <Route path="/admin/blogs" component={ BlogsOverviewPage }></Route>
        <Route path="/admin/categories" component={ CategoriesOverviewPage }></Route>
        <Route path="/admin/posts" component={ PostsOverviewPage }></Route>
        <Route path="/admin/museums" component={MuseumsOverviewPage}></Route>

        
      </div>
    )
  }
}

export default (AdminPage);