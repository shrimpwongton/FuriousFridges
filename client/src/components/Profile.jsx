import React from 'react';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  blueGrey500, white, amber500
} from 'material-ui/styles/colors';
import {
  Link,
} from 'react-router-dom';
import {Tabs, Tab} from 'material-ui/Tabs';
import ActionDashboard from 'material-ui/svg-icons/action/dashboard';
import SocialLocationCity from 'material-ui/svg-icons/social/location-city';
import ActionList from 'material-ui/svg-icons/action/list';
import ActionSettings from 'material-ui/svg-icons/action/settings';

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
          </Toolbar>
        </MuiThemeProvider>
        <MuiThemeProvider>
          <Tabs
            inkBarStyle={{background: amber500, zIndex: 500}}>
            <Tab
              icon={<ActionDashboard/>}
              label="DASHBOARD"
              style={styles.tabStyle}>
              <div>
                stuff here
              </div>
            </Tab>
            <Tab
              icon={<SocialLocationCity/>}
              label="CITY INFO"
              style={styles.tabStyle}
            >
              <div>
                stuff here
              </div>
            </Tab>
            <Tab
              icon={<ActionList/>}
              label="Question Board"
              style={styles.tabStyle}
            >
              <div>
                stuff here
              </div>
            </Tab>
            <Tab
              icon={<ActionSettings/>}
              label="Settings"
              style={styles.tabStyle}>
              <div>
                stuff here
              </div>
            </Tab>
          </Tabs>
        </MuiThemeProvider>
      </div>);
  }
}

export default Profile;
