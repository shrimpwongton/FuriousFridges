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
      'https://s-media-cache-ak0.pinimg.com/originals/83/8f/06/838f06aa06f0ca04db45ce3bf73516f8.jpg',
      'http://magic.wizards.com/sites/mtg/files/images/featured/GP_HongKong.jpg',
      'http://japanphototrip.com/wp-content/uploads/2015/02/fushimi-inari-daisha.jpg',
      'http://www.dyspraxia.ie/userfiles/images/Singapore-1540.jpg',
      'https://media.timeout.com/images/100432575/image.jpg',
      'http://cdn-image.travelandleisure.com/sites/default/files/styles/1600x1000/public/1444253482/DG2015-san-francisco.jpg?itok=MdRJm2Zo',
      'https://www.mostbeautifulspots.com/wp-content/uploads/2016/10/Zhangjiajie-National-Forest-Park-China.jpg',
      'http://lowerantelope.com/wp-content/uploads/2016/05/LA-gallery-img1_0006_Layer-4-1024x768.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/b/ba/Sagrada_Familia_nave_roof_detail.jpg',
      'http://images.huffingtonpost.com/2015-11-19-1447968585-1661590-6672156239_89c77d53d8_o.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/f/f5/Taj_Mahal_2012.jpg',
      'https://www.outdoorproject.com/sites/default/files/styles/cboxshow/public/img_2713.jpg?itok=eEZBZMLX',
      'http://static.thousandwonders.net/Jiufen.original.5446.jpg',
      'http://www.myhockeytournaments.com/img/sites/chicago/001.jpg',

    ];
    const captions = [
      'Liberty Square, Taipei · 自由廣場，臺北',
      'Victoria Peak, Hong Kong · 太平山，香港',
      'Fushimi Inari Taisha, Kyoto · 伏見稲荷大社，京都',
      'Gardens By The Bay, Singapore · 滨海湾花园资讯指南，新加坡',
      'Central Park, New York City',
      'Golden Gate Bridge, San Francisco',
      'Zhangjiajie National Park, China · 湖南张家界国家森林公园;，中国',
      'Antelope Canyon, Arizona',
      'Sagrada Família, Barcelona',
      'Paris, France',
      'Taj Mahal, India',
      'Half Dome, California',
      'Jiufen, Taiwan · 九分，臺灣',
      'Millennium Park, Chicago'
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
      imageStyle: {
        width: '100%',
        height: '95%',
        objectFit: 'cover',
        overflow: 'hidden',
      },
      divStyle: {
        overflow: 'hidden',
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
            Relocate.me
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
