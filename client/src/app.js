import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AskQuestionBoard from './components/AskQuestionBoard.jsx';
import HomePage from './components/HomePage.jsx';
import Login from './components/Login.jsx';
import Profile from './components/Profile.jsx';
import Signup from './components/Signup.jsx';
import NewUserForm from './components/NewUserForm.jsx';
import store from './components/store';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {

    return (
      <Router>
        <Provider store={store}>  
          <div>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/profile" user={this.props.user} component={Profile} />
            <Route exact path="/form" component={NewUserForm} />
          </div>
        </Provider>
      </Router>
    );
  }
}
injectTapEventPlugin();
ReactDOM.render(<App/>, document.getElementById('app'));
