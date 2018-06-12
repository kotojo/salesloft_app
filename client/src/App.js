import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';
import PeopleList from './PeopleList';
import CharacterFrequency from './CharacterFrequency';
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
          <p>Welcome to my salesloft app</p>
          {error && <p>Sorry, something went wrong getting your available people. Please refresh!</p>}
          <ul>
            <li>
              <Link to="/">People Dashboard</Link>
            </li>
            <li>
              <Link to="/frequency">View email character frequency</Link>
            </li>
          </ul>
          <Switch>
            <Route exact path="/" render={() => <PeopleList people={people} />} />
            <Route
              exact
              path="/frequency"
              render={() => <CharacterFrequency emails={people.map(p => p.email_address)} />}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
