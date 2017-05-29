
import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './components/HomePage.jsx';
import Login from './components/Login.jsx';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';


class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {

    return (
      <Router>
        <div>
          <Route exact path="/" component={HomePage}/>
          <Route path="/login" component={Login} />
        </div>
      </Router>
    );
  }
}
ReactDOM.render(<App/>, document.getElementById('app'));
