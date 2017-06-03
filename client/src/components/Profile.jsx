import React from 'react';
import {
  Link,
} from 'react-router-dom';
import {
  blueGrey500, white, pinkA200, pinkA100, grey300
} from 'material-ui/styles/colors';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Tabs, Tab} from 'material-ui/Tabs';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import {List, ListItem} from 'material-ui/List';
import Snackbar from 'material-ui/Snackbar';
import AskQuestionBoard from './AskQuestionBoard.jsx';
import Dashboard from './Dashboard.jsx';
import Avatar from 'material-ui/Avatar';
import CityInfo from './CityInfo.jsx';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      snackBar: false,
      firstName: '',
      lastName: '',
      email: '',
      question: false,
      profilePic: '',
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleNewQuestion = this.handleNewQuestion.bind(this);
    this.handleQuestionClose = this.handleQuestionClose.bind(this);
    this.handleQuestionSubmit = this.handleQuestionSubmit.bind(this);
  }

  componentWillMount() {
    $.get('/authenticated', (auth) => {
      this.setState({
        firstName: auth.first,
        lastName: auth.last,
        email: auth.email,
        id: auth.id,
        profilePic: auth.profile_pic
      });
    });
  }

  handleToggle () {
    this.setState({open: !this.state.open});
  }

  handleSave () {
    this.setState({snackBar: true, open: false});
  }
  handleClose () {
    this.setState({snackBar: false});
  }
  handleNewQuestion () {
    this.setState({question: true});
  }
  handleQuestionClose () {
    this.setState({question: false});
  }
  handleQuestionSubmit () {
    this.setState({question: false});
    // Add question here
  }
  render () {

    const styles = {
      homeStyle: {
        textDecoration: 'none',
      },
      toolbarStyle: {
        backgroundColor: blueGrey500,
      },
      whiteTextStyle: {
        color: 'white',
        left: 15,
      },
      signInStyle: {
        left: 'auto',
        bottom: 'auto',
      },
      tabStyle: {
        backgroundColor: blueGrey500,
        overflow: 'hidden',
      },
      headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
      },
      textFieldStyle: {
        left: '18px',
      },
      underlineStyle: {
        borderColor: pinkA200,
      },
      floatingLabelStyle: {
        color: pinkA200,
      },
      switchStyle: {
        backgroundColor: pinkA200,
      },
      trackStyle: {
        backgroundColor: pinkA100,
      },
      saveButtonStyle: {
        color: pinkA200,
      },
      tabs: {
        background: blueGrey500,
      },
      tab: {
        flex: '1',
      },
    };

    return (
      <div>
        <MuiThemeProvider>
          <Toolbar
            style = {styles.toolbarStyle}>
            <ToolbarGroup firstChild={true} style={styles.titleStyle}>
              <Link to='/'
                    style={styles.homeStyle}
              >
                <ToolbarTitle
                  text="Relocate.me"
                  style={styles.whiteTextStyle}
                />
              </Link>
            </ToolbarGroup>
            <ToolbarGroup style={styles.signInStyle}>
              <IconButton
                onTouchTap={this.handleToggle}>
                <ActionSettings
                  color = {white}
                />
              </IconButton>
              <a href='/logout'>
                <FlatButton
                  style={styles.whiteTextStyle}
                  label="LOG OUT"
                />
              </a>
            </ToolbarGroup>
          </Toolbar>
        </MuiThemeProvider>
        <MuiThemeProvider>
          <Tabs
            tabItemContainerStyle={{width: '100vw'}}
            inkBarStyle={{background: pinkA200, zIndex: 500}}
            contentContainerStyle={{background: grey300}}
            style={styles.tabs}>
            <Tab
              label="DASHBOARD"
              style={styles.tabStyle}
            >
              <div>
                <Dashboard/>
              </div>
            </Tab>
            <Tab
              label="CITY INFO"
              style={styles.tabStyle}
            >
              <div>
                <CityInfo/>
              </div>
            </Tab>
            <Tab
              label="QUESTIONS"
              style={styles.tabStyle}
            >
              <div
                style={styles.tab}
              >
                <AskQuestionBoard/>
              </div>
            </Tab>
          </Tabs>
        </MuiThemeProvider>
        <MuiThemeProvider>
          <Drawer
            docked={false}
            open={this.state.open}
            width={400}
            openSecondary={true}
            onRequestChange={(open) => this.setState({open})} >
            <ListItem
              leftAvatar={<Avatar src={this.state.profilePic}/>}
              primaryText={this.state.firstName + ' ' + this.state.lastName}
              secondaryText={this.state.email}
            />
            <Subheader>General</Subheader>
            <TextField
              style={styles.textFieldStyle}
              hintText="John"
              floatingLabelText="First Name"
              floatingLabelFixed={true}
              underlineFocusStyle={styles.underlineStyle}
              floatingLabelFocusStyle={styles.floatingLabelStyle}
            />
            <br/>
            <TextField
              style={styles.textFieldStyle}
              hintText="Smith"
              floatingLabelText="Last Name"
              floatingLabelFixed={true}
              underlineFocusStyle={styles.underlineStyle}
              floatingLabelFocusStyle={styles.floatingLabelStyle}
            />
            <Divider/>
            <Subheader>Location</Subheader>
            <Divider/>
            <Subheader>Privacy</Subheader>
            <ListItem primaryText="Visibility"
                      secondaryText="Profile visible to other users"
                      rightToggle={
                        <Toggle
                          thumbSwitchedStyle={styles.switchStyle}
                          trackSwitchedStyle={styles.trackStyle}
                        />}
            />
            <FlatButton
              label="SAVE"
              style ={styles.saveButtonStyle}
              onTouchTap = {this.handleSave}
            />
            <FlatButton
              label="CANCEL"
              onTouchTap={this.handleToggle}
            />
          </Drawer>
        </MuiThemeProvider>
        <MuiThemeProvider>
          <Snackbar
            open={this.state.snackBar}
            message="Settings were saved"
            autoHideDuration={3000}
            action="DISMISS"
            onActionTouchTap={this.handleClose}
            onRequestClose={this.handleClose}
          />
        </MuiThemeProvider>
      </div>);
  }
}

export default Profile;
