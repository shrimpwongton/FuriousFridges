import React from 'react';
import axios from 'axios';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
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
import ActionTrendingDown from 'material-ui/svg-icons/action/trending-down';
import CityOptions from '../CityOptions.json';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import {
  blueGrey500, red500, orange500, amber500, lightGreen500, green500, grey500,
} from 'material-ui/styles/colors';


class CityInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      housing: 0,
      col: 0,
      health_care: 0,
      environmental_quality: 0,
      economy: 0,
      leisure: 0,
      commute: 0,
      safety: 0,
      education: 0,
      summary: '',
      travel_connectivity: 0,
      internet_access: 0,
      tolerance: 0,
      outdoors: 0,
    };
    this.calculateColor = this.calculateColor.bind(this);
    this.calculateScoreStatus = this.calculateScoreStatus.bind(this);
    this.objectKeyByValue = this.objectKeyByValue.bind(this);
  }

  objectKeyByValue (obj, val) {
    if ( typeof val === 'undefined' ) {
      return [''];
    }
    return Object.entries(obj).find(i => i[1] === val);
  }

  calculateColor (score) {
    if ( score > 8 ) {
      return green500;
    } else if ( score > 6 ) {
      return lightGreen500;
    } else if ( score > 4.5 ) {
      return amber500;
    } else if ( score > 3 ) {
      return orange500;
    } else if ( score > 0 ) {
      return red500;
    } else {
      return grey500;
    }
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
    } else if ( score > 0 ) {
      return 'Among the worst';
    } else {
      return 'Not Available';
    }
  }

  componentWillReceiveProps() {
    axios.get('/cityinfo')
      .then(res => {
        this.setState({
          housing: res.data.categories[0].score_out_of_10,
          col: res.data.categories[1].score_out_of_10,
          health_care: res.data.categories[8].score_out_of_10,
          environmental_quality: res.data.categories[10].score_out_of_10,
          economy: res.data.categories[11].score_out_of_10,
          leisure: res.data.categories[14].score_out_of_10,
          travel_connectivity: res.data.categories[4].score_out_of_10,
          internet_access: res.data.categories[13].score_out_of_10,
          tolerance: res.data.categories[15].score_out_of_10,
          outdoors: res.data.categories[16].score_out_of_10,
          commute: res.data.categories[5].score_out_of_10,
          safety: res.data.categories[7].score_out_of_10,
          education: res.data.categories[9].score_out_of_10,
          summary: res.data.summary.replace(/<\/?[^>]+(>|$)/g, ''),
        });
      });
    axios.get('/cityphoto')
      .then(res => {
        this.setState({
          photoURL: res.data.photos[0].image.web,
        });
      });
    this.setState({
      city: this.objectKeyByValue(CityOptions, this.props.destinationCity)[0],
    });
  }

  render () {
    const styles = {
      cardStyle: {
        margin: '8px',
      },
      flexStyle: {
        margin: '8px',
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'center',
      },
      growStyle: {
        flexGrow: 1,
      },
      centerStyle: {
        width: '90%',
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'center',
      },
      mobileCenterStyle: {
        width: '100%',
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'center',
      },
      emptyStyle: {
        flexGrow: 1000,
      },
      image: {
        height: '35vh',
        width: '100%',
      },
      divImage: {
        height: '100%',
        width: '100%',
        position: 'relative',
        objectFit: 'cover',
        overflow: 'hidden',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundImage: 'url(' + this.state.photoURL + ')',
      },
      text: {
        position: 'absolute',
        left: '0px',
        bottom: '0px',
        right: '0px',
        background: 'rgba(0, 0, 0, 0.4)'
      },
      textMargin: {
        marginLeft: '5vw',
        marginRight: '5vw',
        marginBottom: '20px',
      },
      city: {
        fontFamily: "'Roboto Medium', sans-serif",
        color: 'white',
        fontSize: '3em',
      },
      summary: {
        fontFamily: "'Roboto', sans-serif",
        color: 'white',
        fontSize: '1em',
      }
    };
    let cards = [['Housing Affordability', this.state.housing, <ActionHome/>],
      ['Cost of Living', this.state.col, <EditorAttachMoney/>],
      ['Economy', this.state.economy, this.state.economy > 5 ? <ActionTrendingUp/> : <ActionTrendingDown/>],
      ['Health Care', this.state.health_care, <ImageHealing/>],
      ['Environment Quality', this.state.environmental_quality, <MapsLocalFlorist/>],
      ['Leisure and Culture', this.state.leisure, <MapsLocalBar/>],
      ['Safety', this.state.safety, <SocialPublic/>],
      ['Outdoors', this.state.outdoors, <MapsTerrain/>],
      ['Education', this.state.education, <MapsLocalLibrary/>],
      ['Tolerance', this.state.tolerance, <SocialGroup/>],
      ['Commute', this.state.commute, <MapsDirectionsCar/>],
      ['Air and Rail Connectivity', this.state.travel_connectivity, <MapsDirectionsTransit/>],
      ['Internet Access', this.state.internet_access, <ActionExplore/>]].sort((a, b) => { return b[1] - a[1]; });
    const context = this;
    return (
      <div>
        <div>
          <MuiThemeProvider>
            <Paper style={styles.image} zDepth={1}>
              <div style={styles.divImage}>
                  <div style={styles.text}>
                    <div style={styles.textMargin}>
                      <span style={styles.city}>{this.state.city}</span>
                      <br/>
                      <span style={styles.summary}>{this.state.summary}</span>
                    </div>
                  </div>
              </div>
            </Paper>
          </MuiThemeProvider>
        </div>
        {
          this.props.width > 600 ?
            <div
              style={styles.flexStyle}>
              <div
                style={styles.centerStyle}>
                { cards.map(card =>
                <div
                  style={styles.growStyle}>
                  <MuiThemeProvider>
                    <Card
                      style={styles.cardStyle}>
                      <CardHeader
                        title={card[0]}
                        subtitle={context.calculateScoreStatus(card[1])}
                        avatar={
                          <Avatar
                            icon={card[2]}
                            backgroundColor={context.calculateColor(card[1])}
                          />
                        }
                      />
                      <CardText>
                        <div
                          style={{width: card[1] * 10 + '%', height: '2px', background: context.calculateColor(card[1])}}>
                        </div>
                      </CardText>>
                    </Card>
                  </MuiThemeProvider>
                </div>)}
                <div style={styles.emptyStyle}/>
              </div>
            </div>
          :
            <div
              style={styles.flexStyle}>
              <div
                style={styles.mobileCenterStyle}>
                { cards.map(card =>
                <div
                  style={styles.growStyle}>
                  <MuiThemeProvider>
                    <ListItem
                      style={{width: '100%'}}
                      primaryText={card[0]}
                      secondaryText={context.calculateScoreStatus(card[1])}
                      disabled={true}
                      leftAvatar={
                        <Avatar
                          icon={card[2]}
                          backgroundColor={context.calculateColor(card[1])}
                        />
                      }
                    />
                  </MuiThemeProvider>
                  <div style={styles.emptyStyle}/>
                </div>)
                }
              </div>
            </div>
        }
      </div>
    );
  }
}

export default CityInfo;
