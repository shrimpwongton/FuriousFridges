import React from 'react';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  blueGrey500, grey300, white
} from 'material-ui/styles/colors';
import {
  Link,
} from 'react-router-dom';
import GoogleButton from 'react-google-button';
import FlatButton from 'material-ui/FlatButton';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render () {
    const images = [
      '/assets/LibertySquare.jpg',
      '/assets/VictoriaHarbor.jpg',
      '/assets/Kyoto.jpg',
      '/assets/Singapore.jpg',
      '/assets/CentralPark.jpg',
      '/assets/GoldenGate.jpg',
      '/assets/Zhangjiajie.jpg',
      '/assets/AntelopeValley.jpg',
      '/assets/Paris.jpg',
      '/assets/TajMahal.jpg',
      '/assets//HalfDome.jpg',
      '/assets/JiuFen.jpg',
      '/assets/Chicago.jpg',
      '/assets/Uluru.jpg',
      '/assets/GuangHuaMen.jpg',
      '/assets/BrandenburgGate.jpg',
      '/assets/StBasilsCathedral.jpg',
    ];
    const captions = [
      'Liberty Square, Taipei · 自由廣場，臺北市',
      'Victoria Harbor, Hong Kong · 維多利亞港，香港',
      'Fushimi Inari Taisha, Kyoto · 伏見稲荷大社，京都',
      'Gardens By The Bay, Singapore · 滨海湾花园资讯指南，新加坡',
      'Central Park, New York City',
      'Golden Gate Bridge, San Francisco',
      'Zhangjiajie National Park, China · 湖南张家界国家森林公园;，中国',
      'Antelope Canyon, Arizona',
      'Paris, France',
      'Taj Mahal, India',
      'Half Dome, California',
      'Jiufen, Taiwan · 九分，臺灣',
      'Millennium Park, Chicago',
      'Uluru, Australia',
      'Gwanghwamun, South Korea · 광화문，대한민국',
      'Brandenburg Gate, Berlin · Brandenburger Tor, Berlin',
      'St. Basil\'s Cathedral, Moscow · Собор Василия Блаженного, Москва́'
    ];
    const randomNumber = Math.floor(Math.random() * images.length);

    const styles = {
      homeStyle: {
        textDecoration: 'none',
      },
      toolbarStyle: {
        backgroundColor: blueGrey500,
        position: 'fixed',
        zIndex: 10000,
        width: '100%',
      },
      whiteTextStyle: {
        color: 'white',
        left: 15,
      },
      signInStyle: {
        left: 'auto',
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
        fontSize: '3em',
      },
      captionStyle: {
        fontFamily: "'Roboto', sans-serif",
        color: 'white',
        fontSize: '1em',
        margin: 0,
        top: 'auto',
        right: 'auto',
        bottom: 20,
        left: '20',
        position: 'fixed',
      },
      imageStyle: {
        flexGrow: 1
      },
      divStyle: {
        overflow: 'hidden',
      },
      googleSignInStyle: {
        textDecoration: 'none',
      },
      flexStyle: {
        height: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      },
      parallaxFirst: {
        flexGrow: 1,
        position: 'relative',
        backgroundImage: 'url(' + images[randomNumber] + ')',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
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
              <Link to='/login'>
                <FlatButton
                  style={styles.whiteTextStyle}
                  label="LOG IN"
                />
              </Link>
            </ToolbarGroup>
          </Toolbar>
        </MuiThemeProvider>
        <div
          style={styles.flexStyle}>
          <div
            style={styles.parallaxFirst}>
            <p
              style={styles.captionStyle}>
              {captions[randomNumber]}
            </p>
          </div>
        </div>
        <div
          style={styles.centerStyle}>
          <p
            style={styles.subHeaderStyle}>
            Packing can wait, start here
          </p>
          <a href="/auth/google"
             style = {styles.googleSignInStyle}>
            <GoogleButton
              label="Sign up with Google"
            />
          </a>
        </div>
      </div>);
  }
}

export default Signup;
