import React from 'react';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  blueGrey500, white
} from 'material-ui/styles/colors';
import {
  Link,
} from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';

class Settings extends React.Component {
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
              <ToolbarTitle
                text="Settings"
                style={styles.whiteTextStyle}
              />
            </ToolbarGroup>
            <ToolbarGroup style={styles.signInStyle}>
              <a href='/logout'>
                <FlatButton
                  style={styles.whiteTextStyle}
                  label="LOG OUT"
                />
              </a>
            </ToolbarGroup>
          </Toolbar>
        </MuiThemeProvider>
      </div>);
  }
}

export default Settings;
