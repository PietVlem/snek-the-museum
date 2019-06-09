/*
Import extenal libraries
*/
import React, { Component } from 'react';
import { Redirect, Switch } from 'react-router-dom';

/*
Utilities
*/
import { RouteWithLayout } from './utilities';

/*
Layout
*/
import { LoginLayout, PageLayout } from './layouts';
import { AdminLayout } from './admin/layouts';

/*
Page components
*/
import HomePage from './pages/home';
import AdminPage from './admin/pages/admin';
import LoginPage from './pages/login';
import NewsPage from './pages/news';
import PostDetailPage from './pages/post-detail';
import PasswordResetPage from './pages/passwordreset';

/*
Import styling
*/
import './Main.css';

class Main extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <RouteWithLayout exact path='/' layout={ PageLayout } component={ HomePage }/>
          <Redirect from="/home" to="/"/>
          <RouteWithLayout exact path='/news' layout={ PageLayout } component={ NewsPage }/>
          <RouteWithLayout exact path='/news/:id' layout={ PageLayout } component={ PostDetailPage }/>
          <RouteWithLayout exact path='/reset/:id' layout={ LoginLayout } component={ PasswordResetPage }/>
          <RouteWithLayout path="/login" layout={ LoginLayout } component={ LoginPage }/>
          <RouteWithLayout path="/admin" layout={ AdminLayout } component={ AdminPage }/>
        </Switch>
      </div>
    );
  }
}

export default Main;