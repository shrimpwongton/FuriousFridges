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

class HomePage extends React.Component {
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
      '/assets/Phuket.jpg',
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
      'Phuket, Thailand · ภูเก็ต，ประเทศไทย',
      'Gwanghwamun, South Korea · 광화문，대한민국',
      'Brandenburg Gate, Berlin · Brandenburger Tor, Berlin',
      'St. Basil\'s Cathedral, Moscow · Собор Василия Блаженного, Москва́'
    ];
    const randomNumber = Math.floor(Math.random()*images.length);

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
      headerStyle: {
        fontFamily: "'Roboto-Light', sans-serif",
        color: 'white',
        fontSize: '8em',
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
        width: '100%',
        height: '94%',
        objectFit: 'cover',
        overflow: 'hidden',
      },
      divStyle: {
        overflow: 'hidden',
      },
      flexStyle: {
        display: 'flex',
        flexDirection: 'column',
      }
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
              <Link to='/signup'>
                <FlatButton
                  style={styles.whiteTextStyle}
                  label="SIGN UP"
                />
              </Link>
              <ToolbarSeparator/>
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
          <img
            src={images[randomNumber]}
            style={styles.imageStyle}/>
          <p
            style={styles.captionStyle}>
            {captions[randomNumber]}
          </p>
        </div>
        <div
          style={styles.centerStyle}>
          <p
            style={styles.headerStyle}>
            Where to?
          </p>
          <p
            style={styles.subHeaderStyle}>
            You handle the packing, we'll take of the rest
          </p>
        </div>
      </div>);
  }
}

export default HomePage;
