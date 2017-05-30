import React from 'react';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  blueGrey500, white, pinkA200, grey300
} from 'material-ui/styles/colors';
import {
  Link,
} from 'react-router-dom';
import {Tabs, Tab} from 'material-ui/Tabs';
import ActionDashboard from 'material-ui/svg-icons/action/dashboard';
import SocialLocationCity from 'material-ui/svg-icons/social/location-city';
import ActionList from 'material-ui/svg-icons/action/list';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Dashboard from './Dashboard.jsx';
import CityInfo from './CityInfo.jsx';
import QuestionBoard from './QuestionBoard.jsx';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
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
      divStyle: {
        overflow: 'hidden',
      },
      tabStyle: {
        backgroundColor: blueGrey500,
      },
      headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
      },
    };

    return (
      <div style={styles.divStyle}>
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
              <Link to='/settings'
                    style={styles.homeStyle}
              >
                <IconButton
                  tooltip="Settings">
                  <ActionSettings
                    color = {white}
                  />
                </IconButton>
              </Link>
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
            tabItemContainerStyle={{width: '400px'}}
            inkBarStyle={{background: pinkA200, zIndex: 500}}
            contentContainerStyle={{background: grey300}}
            style={{background: blueGrey500}}>
            <Tab
              label="DASHBOARD"
              style={styles.tabStyle}>
              <div>
                <p>{this.props.user}</p>
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
              <div>
                <QuestionBoard/>
              </div>
            </Tab>
          </Tabs>
        </MuiThemeProvider>
      </div>);
  }
}

export default Profile;
