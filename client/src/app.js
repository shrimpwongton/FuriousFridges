
import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './components/HomePage.jsx';
import Login from './components/Login.jsx';
import Profile from './components/Profile.jsx';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';


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
          <Route path="/signup" component={Login} />
          <Route path="/profile" user={this.props.user} component={Profile} />
        </div>
      </Router>
    );
  }
}
injectTapEventPlugin();
ReactDOM.render(<App {...(document.getElementById('app').dataset)} />, document.getElementById('app'));
