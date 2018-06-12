import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import axios from 'axios';
import PeopleList from '../PeopleList';
import CharacterFrequency from '../CharacterFrequency';
import Duplicates from '../Duplicates';
import './App.css';

class App extends Component {
  state = {
    error: '',
    people: [],
  };

  async componentDidMount() {
    try {
      const response = await axios.get('/api/people');
      this.setState({
        people: response.data,
      });
    } catch (e) {
      this.setState({
        error: e.message,
      });
    }
  }

  render() {
    const { people, error } = this.state;
    return (
      <BrowserRouter>
        <div>
          <nav className="flex justify-content-between align-items-center nav">
            <div className="flex align-items-center">
              <h2 className="title">My Salesloft App</h2>
              <p className="creator">By Bruce Kellerman</p>
            </div>
            <div>
              <NavLink activeClassName="active" exact className="nav-link" to="/">
                Dashboard
              </NavLink>
              <NavLink activeClassName="active" className="nav-link" to="/frequency">
                Character Frequency
              </NavLink>
              <NavLink activeClassName="active" className="nav-link" to="/duplicates">
                Duplicate People
              </NavLink>
            </div>
          </nav>
          {error && <p className="error">Sorry, something went wrong getting your available people. Please refresh!</p>}
          <Switch>
            <Route exact path="/" render={() => <PeopleList people={people} />} />
            <Route
              exact
              path="/frequency"
              render={() => <CharacterFrequency emails={people.map(p => p.email_address)} />}
            />
            <Route exact path="/duplicates" render={() => <Duplicates emails={people.map(p => p.email_address)} />} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
