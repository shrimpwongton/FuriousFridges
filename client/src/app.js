import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './components/HomePage.jsx';
import Login from './components/Login.jsx';
import Profile from './components/Profile.jsx';
import Signup from './components/Signup.jsx';
import {
  BrowserRouter as Router,
  Route,
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
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/profile" user={this.props.user} component={Profile} />
        </div>
      </Router>
    );
  }
}
injectTapEventPlugin();
ReactDOM.render(<App/>, document.getElementById('app'));