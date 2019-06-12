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
import ZipcodesOverviewPage from '../zipcodes-overview';
import DisabilitiesOverviewPage from '../disabilities-overview';
import ExhibitionsOverviewPage from '../exhibitions-overview';
import UsersOverviewPage from '../users-overview';

class AdminPage extends Component {
  componentWillMount() {
    if(localStorage.getItem('snek_the_museum') == null){
      window.location.href = 'http://localhost:3000/login';
    }
  }

  render() {
    return (
      <div className="Admin">
        {/* to be done */}
        <Route path="/admin/Assignments" component={MuseumsOverviewPage}></Route>
        
        {/* done */}
        <Route path="/admin/users" component={UsersOverviewPage}></Route>
        <Route path="/admin/zipcodes" component={ZipcodesOverviewPage}></Route>
        <Route path="/admin/blogs" component={ BlogsOverviewPage }></Route>
        <Route path="/admin/categories" component={ CategoriesOverviewPage }></Route>
        <Route path="/admin/posts" component={ PostsOverviewPage }></Route>
        <Route path="/admin/museums" component={MuseumsOverviewPage}></Route>
        <Route path="/admin/disabilities" component={DisabilitiesOverviewPage}></Route>
        <Route path="/admin/exhibitions" component={ExhibitionsOverviewPage}></Route>
      </div>
    )
  }
}

export default (AdminPage);