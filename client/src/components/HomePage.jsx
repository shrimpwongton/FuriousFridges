import React from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  blueGrey500, blueGrey400, blueGrey300, blueGrey200, grey300, white, pinkA200
} from 'material-ui/styles/colors';
import {
  Link,
} from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import CityData from '../CityOptions.json';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import ActionHome from 'material-ui/svg-icons/action/home';
import ImageHealing from 'material-ui/svg-icons/image/healing';
import MapsTerrain from 'material-ui/svg-icons/maps/terrain';
import EditorAttachMoney from 'material-ui/svg-icons/editor/attach-money';
import MapsLocalBar from 'material-ui/svg-icons/maps/local-bar';
import MapsDirectionsTransit from 'material-ui/svg-icons/maps/directions-transit';
import MapsDirectionsCar from 'material-ui/svg-icons/maps/directions-car';
import MapsLocalFlorist from 'material-ui/svg-icons/maps/local-florist';
import SocialPublic from 'material-ui/svg-icons/social/public';
import MapsLocalLibrary from 'material-ui/svg-icons/maps/local-library';
import ActionExplore from 'material-ui/svg-icons/action/explore';
import SocialGroup from 'material-ui/svg-icons/social/group';
import ActionTrendingUp from 'material-ui/svg-icons/action/trending-up';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.calculateScoreStatus = this.calculateScoreStatus.bind(this);
  }
  calculateScoreStatus (score) {
    if ( score > 8 ) {
      return 'Among the best';
    } else if ( score > 6 ) {
      return 'Above Average';
    } else if ( score > 4.5 ) {
      return 'Around Average';
    } else if ( score > 3 ) {
      return 'Below Average';
    } else {
      return 'Among the worst';
    }
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
    const randomNumber = Math.floor(Math.random()*images.length);
    let randomNumber2 = Math.floor(Math.random()*images.length);
    let randomNumber3 = Math.floor(Math.random()*images.length);
    let randomNumber4 = Math.floor(Math.random()*images.length);
    while ( randomNumber2 === randomNumber ){
      randomNumber2 = Math.floor(Math.random()*images.length);
    }
    while ( randomNumber3 === randomNumber && randomNumber3 === randomNumber2 ) {
      randomNumber3 = Math.floor(Math.random()*images.length);
    }
    while ( randomNumber4 === randomNumber && randomNumber4 === randomNumber2 && randomNumber4 === randomNumber3 ) {
      randomNumber4 = Math.floor(Math.random()*images.length);
    }
    let cityNames = [];
    Object.keys(CityData).map((city) => {
      cityNames.push(city);
    });
    let set = new Set();
    while ( set.size < 10 ) {
      set.add(cityNames[Math.floor(Math.random() * cityNames.length)]);
    }
    set = Array.from(set);

    const cards = [['Housing Affordability', <ActionHome/>],
      ['Cost of Living', <EditorAttachMoney/>],
      ['Economy', <ActionTrendingUp/>],
      ['Health Care', <ImageHealing/>],
      ['Environment Quality', <MapsLocalFlorist/>],
      ['Leisure and Culture', <MapsLocalBar/>],
      ['Safety', <SocialPublic/>],
      ['Outdoors', <MapsTerrain/>],
      ['Education', <MapsLocalLibrary/>],
      ['Tolerance',  <SocialGroup/>],
      ['Commute', <MapsDirectionsCar/>],
      ['Air and Rail Connectivity', <MapsDirectionsTransit/>],
      ['Internet Access', <ActionExplore/>]];

    let cardSet = new Set();
    while ( cardSet.size < 5 ) {
      cardSet.add(cards[Math.floor(Math.random() * cards.length)]);
    }
    cardSet = Array.from(cardSet);
    console.log('cardSet', cardSet);

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
        fontSize: '2em',
      },
      headerStyle: {
        fontFamily: "'Roboto', sans-serif",
        color: 'white',
        fontSize: '4em',
      },
      captionStyle: {
        fontFamily: "'Roboto', sans-serif",
        color: 'white',
        fontSize: '1em',
        position: 'absolute',
        left: '20px',
        bottom: '0px',
      },
      divStyle: {
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      },
      parallaxFirst: {
        height: '60vh',
        position: 'relative',
        backgroundImage: 'url(' + images[randomNumber] +')',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      },
      parallaxSecond: {
        height: '60vh',
        position: 'relative',
        backgroundImage: 'url(' + images[randomNumber2] +')',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      },
      parallaxThird: {
        height: '60vh',
        position: 'relative',
        backgroundImage: 'url(' + images[randomNumber3] +')',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      },
      parallaxFourth: {
        height: '60vh',
        position: 'relative',
        backgroundImage: 'url(' + images[randomNumber4] +')',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      },
      chip: {
        margin: 4,
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
        <div
          style={styles.parallaxFirst}>
          <p
            style={styles.captionStyle}>
            {captions[randomNumber]}
          </p>
        </div>
        <div
          style={{padding: '20px', backgroundColor: blueGrey400}}>
          <span
            style={styles.subHeaderStyle}>
            Hundreds of cities to lookup
          </span>
          <div
            style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
          {
            set.map((city) => {
              return (
                <MuiThemeProvider>
                  <Chip
                    style={styles.chip}>
                    <Avatar size={32}
                            backgroundColor={pinkA200}
                    >
                      {city[0]}
                    </Avatar>
                    {city}
                  </Chip>
                </MuiThemeProvider>);
            })
          }
          </div>
        </div>
        <div
          style={styles.parallaxSecond}>
          <p
            style={styles.captionStyle}>
            {captions[randomNumber2]}
          </p>
        </div>
        <div
          style={{padding: '20px', backgroundColor: blueGrey300}}>
          <span
            style={styles.subHeaderStyle}>
            Determine the best qualities of cities
          </span>
          <div
            style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
            {
              cardSet.map((card) => {
                return (
                  <MuiThemeProvider>
                    <Card
                      style={{margin: '4px'}}>
                      <CardHeader
                        title={card[0]}
                        subtitle={this.calculateScoreStatus(Math.random() * 10)}
                        avatar={
                          <Avatar
                            icon={card[1]}
                            backgroundColor={pinkA200}
                          />
                        }
                      />
                    </Card>
                  </MuiThemeProvider>
                );
              })
            }
          </div>
        </div>
        <div
          style={styles.parallaxThird}>
          <p
            style={styles.captionStyle}>
            {captions[randomNumber3]}
          </p>
        </div>
        <div
          style={{padding: '20px', backgroundColor: blueGrey200}}>
          <span
            style={styles.subHeaderStyle}>
            Have questions?  Ask the locals for the best pint, or nearby park.
          </span>
        </div>
        <div
          style={styles.parallaxFourth}>
          <p
            style={styles.captionStyle}>
            {captions[randomNumber4]}
          </p>
        </div>
      </div>);
  }
}

export default HomePage;
