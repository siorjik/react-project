import React, { Component } from 'react';
import './App.css';

import {Router, Route, NavLink, Switch} from 'react-router-dom';
import createBrowserHistory from "history/createBrowserHistory";

import TopMenu from "./components/TopMenu";
import Groups from "./components/Groups";
import Coming from "./components/Coming";
import Products from "./components/Products";
import Users from "./components/Users";
import Settings from "./components/Settings";

class App extends Component {
  render() {
    return (
      <Router history={createBrowserHistory()}>
        <div id='main-wrap'>
          <header>
            <TopMenu/>
          </header>
          <main>
            <aside>
              <nav>
                <ul>
                  <li><NavLink exact to="/" activeClassName="active">Приход</NavLink></li>
                  <li><NavLink to="/groups" activeClassName="active">Группы</NavLink></li>
                  <li><NavLink to="/products" activeClassName="active">Продукты</NavLink></li>
                  <li><NavLink to="/users" activeClassName="active">Пользователи</NavLink></li>
                  <li><NavLink to="/settings" activeClassName="active">Настройки</NavLink></li>
                </ul>
              </nav>
            </aside>
            <div className='content'>
              <Switch>
                <Route exact path="/" component={Coming}/>
                <Route path="/groups" component={Groups}/>
                <Route path="/products" component={Products}/>
                <Route path="/users" component={Users}/>
                <Route path="/settings" component={Settings}/>
              </Switch>
            </div>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
