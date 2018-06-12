import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import PeopleList from './PeopleList';
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
          <Switch>
            <Route exact path="/" render={() => <PeopleList people={people} />} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
