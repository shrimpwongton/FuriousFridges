import React from 'react';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  blueGrey500, white, pinkA200, pinkA100,
} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';


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
      divFlexStyle: {
        margin: '24px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
      },
      cardStyle: {
        width: '400px',
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
        <div
          style={styles.divFlexStyle}>
          <MuiThemeProvider>
            <Card
              style = {styles.cardStyle}>
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
                        secondaryText="Visible to other users"
                        rightToggle={
                          <Toggle
                            thumbSwitchedStyle={styles.switchStyle}
                            trackSwitchedStyle={styles.trackStyle}
                          />}
              />
              <CardActions>
                <FlatButton label="Save" style={{color: pinkA200}} />
              </CardActions>
            </Card>
          </MuiThemeProvider>
        </div>
      </div>);
  }
}

export default Settings;
