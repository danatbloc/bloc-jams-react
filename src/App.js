import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';



class App extends Component {

  render() {
    return (
      <div className="App">
        <section id="header-wrapper">
          <header>
            <nav>
              <NavLink exact to="/" activeClassName="selected" className="nav-link">Home</NavLink>
              <NavLink to="/library" activeClassName="selected" className="nav-link">Library</NavLink>
            </nav>
          </header>
        </section>
        <main id="main-content">
          <Route exact path="/" component={Landing} />
          <Route path="/library" component={Library} />
          <Route path="/album/:slug" component={Album} />
        </main>
      </div>
    );
  }
}

export default App;
