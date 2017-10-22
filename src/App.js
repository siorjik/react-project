import React, {Component} from 'react';
import './App.css';
import Radium, {StyleRoot} from 'radium';
import {bounceInDown} from 'react-animations';
import {Router, Route, NavLink, Switch} from 'react-router-dom';
import createBrowserHistory from "history/createBrowserHistory";

import TopMenu from "./components/TopMenu";
import Groups from "./components/Groups";
import Orders from "./components/Orders";
import Products from "./components/Products";
import Users from "./components/Users";
import Settings from "./components/Settings";

let styles = {
  bounceInDown: {
    animation: 'x 2s',
    animationName: Radium.keyframes(bounceInDown, 'bounceInDown')
  }
}

class App extends Component {
  render() {
    return (
      <StyleRoot id='style-root-animate'>
        <Router history={createBrowserHistory()}>
          <div id='main-wrap'>
            <header>
              <TopMenu/>
            </header>
            <main>
              <aside>
                <nav>
                  <ul style={styles.bounceInDown}>
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
                  <Route exact path="/" component={Orders}/>
                  <Route path="/groups" component={Groups}/>
                  <Route path="/products" component={Products}/>
                  <Route path="/users" component={Users}/>
                  <Route path="/settings" component={Settings}/>
                </Switch>
              </div>
            </main>
          </div>
        </Router>
      </StyleRoot>
    );
  }
}

export default App;
