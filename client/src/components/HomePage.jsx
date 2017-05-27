import React from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  blueGrey500, grey300, white
} from 'material-ui/styles/colors';
import {
  Link,
} from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';

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
    left:'auto',
    bottom: 'auto',
  },
  centerStyle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  subHeaderStyle: {
    fontFamily: "'Roboto', sans-serif",
    color: grey300,
    fontSize: '36px',
  },
  headerStyle: {
    fontFamily: "'Roboto', sans-serif",
    color: 'white',
    fontSize: '45px',
  },
  captionStyle: {
    fontFamily: "'Roboto', sans-serif",
    color: 'white',
    fontSize: '16px',
    margin: 0,
    top: 'auto',
    right: 'auto',
    bottom: 20,
    left: '20',
    position: 'fixed',
  },
};

const HomePage = () => (
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
          <Link to='/login'>
            <FlatButton
              style={styles.whiteTextStyle}
              label="LOG IN"
            />
          </Link>
        </ToolbarGroup>
      </Toolbar>
    </MuiThemeProvider>
    <div>
      <img src='http://magic.wizards.com/sites/mtg/files/images/featured/GP_HongKong.jpg' style={styles.image}/>
      <p
        style={styles.captionStyle}>
        Victoria Peak, Hong Kong · 太平山，香港
      </p>
    </div>
    <div
      style={styles.centerStyle}>
      <p
        style={styles.headerStyle}>
        Relocate.me
      </p>
      <p
        style={styles.subHeaderStyle}>
        I'm going to
      </p>
    </div>
  </div>
)

export default HomePage;
