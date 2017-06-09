import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
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
import MapsLocalAtm from 'material-ui/svg-icons/maps/local-atm';
import SocialDomain from 'material-ui/svg-icons/social/domain';
import HardwareLaptop from 'material-ui/svg-icons/hardware/laptop';
import SocialPerson from 'material-ui/svg-icons/social/person';
import CityOptions from '../CityOptions.json';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import {
  blueGrey500, red500, orange500, amber500, lightGreen500, green500, grey500, pinkA200
} from 'material-ui/styles/colors';
import { setHousing,
         setCol,
         setHealthcare,
         setEnvironmentalQuality,
         setEconomy,
         setLeisure,
         setCommute,
         setSafety,
         setEducation,
         setSummary,
         setTravelConnectivity,
         setInternetAccess,
         setTolerance,
         setOutdoors,
         setTaxation,
         setBusinessFreedom,
         setStartUps,
         setVentureCapital,
         setPhotoURL,
         setCity,
         setScore } from '../actions';


class CityInfo extends React.Component {
  constructor(props) {
    super(props);

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

  componentWillMount() {
    axios.get('/cityinfo')
      .then(res => {
        this.props.dispatchHousing(res.data.categories[0].score_out_of_10);
        this.props.dispatchCol(res.data.categories[1].score_out_of_10);
        this.props.dispatchHealthcare(res.data.categories[8].score_out_of_10);
        this.props.dispatchEnvironmentalQuality(res.data.categories[10].score_out_of_10);
        this.props.dispatchEconomy(res.data.categories[11].score_out_of_10);
        this.props.dispatchLeisure(res.data.categories[14].score_out_of_10);
        this.props.dispatchCommute(res.data.categories[5].score_out_of_10);
        this.props.dispatchSafety(res.data.categories[7].score_out_of_10);
        this.props.dispatchEducation(res.data.categories[9].score_out_of_10);
        this.props.dispatchSummary(res.data.summary.replace(/<\/?[^>]+(>|$)/g, ''));
        this.props.dispatchTravelConnectivity(res.data.categories[4].score_out_of_10);
        this.props.dispatchInternetAccess(res.data.categories[13].score_out_of_10);
        this.props.dispatchTolerance(res.data.categories[15].score_out_of_10);
        this.props.dispatchSafety(res.data.categories[7].score_out_of_10);
        this.props.dispatchOutdoors(res.data.categories[16].score_out_of_10);
        this.props.dispatchTaxation(res.data.categories[12].score_out_of_10);
        this.props.dispatchBusinessFreedom(res.data.categories[6].score_out_of_10);
        this.props.dispatchStartUps(res.data.categories[2].score_out_of_10);
        this.props.dispatchVentureCapital(res.data.categories[3].score_out_of_10);
        this.props.dispatchScore(res.data.teleport_city_score);
      })
      .catch(err => {
        if (err.message.includes('404')) {
          console.log('USER HAS NOT REGISTERED DESTINATION CITY');
          this.props.history.push('/form');
        }
      });
    axios.get('/cityphoto')
      .then(res => {
        this.props.dispatchPhotoURL(res.data.photos[0].image.web);
      });
    this.props.dispatchCity(this.objectKeyByValue(CityOptions, this.props.destinationCity)[0]);
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
        backgroundImage: 'url(' + this.props.photoURL + ')',
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
    let teleportScore = ['Teleport Score', this.props.score, <ActionHome/>];
    let cards = [['Housing Affordability', this.props.housing, <ActionHome/>],
      ['Cost of Living', this.props.col, <EditorAttachMoney/>],
      ['Economy', this.props.economy, this.props.economy > 5 ? <ActionTrendingUp/> : <ActionTrendingDown/>],
      ['Health Care', this.props.health_care, <ImageHealing/>],
      ['Environment Quality', this.props.environmental_quality, <MapsLocalFlorist/>],
      ['Leisure and Culture', this.props.leisure, <MapsLocalBar/>],
      ['Safety', this.props.safety, <SocialPublic/>],
      ['Outdoors', this.props.outdoors, <MapsTerrain/>],
      ['Education', this.props.education, <MapsLocalLibrary/>],
      ['Tolerance', this.props.tolerance, <SocialGroup/>],
      ['Commute', this.props.commute, <MapsDirectionsCar/>],
      ['Air and Rail Connectivity', this.props.travel_connectivity, <MapsDirectionsTransit/>],
      ['Taxation', this.props.taxation, <MapsLocalAtm/>],
      ['Business Freedom', this.props.business_freedom, <SocialDomain/>],
      ['Startup Culture', this.props.startups, <HardwareLaptop/>],
      ['Venture Capital', this.props.venture_capital, <SocialPerson/>],
      ['Internet Access', this.props.internet_access, <ActionExplore/>]].sort((a, b) => { return b[1] - a[1]; });
    const context = this;
    return (
      <div>
        <div>
          <MuiThemeProvider>
            <Paper style={styles.image} zDepth={1}>
              <div style={styles.divImage}>
                  <div style={styles.text}>
                    <div style={styles.textMargin}>
                      <span style={styles.city}>{this.props.city}</span>
                      { this.props.width > 750 ?
                        <div>
                          <br/>
                          <span style={styles.summary}>{this.props.summary}</span>
                        </div>
                        :
                        <div/>
                      }
                    </div>
                  </div>
              </div>
            </Paper>
          </MuiThemeProvider>
        </div>
        {
          this.props.width > 750 ?
            <div
              style={styles.flexStyle}>
              <div
                style={styles.centerStyle}>
                <div
                  style={styles.growStyle}>
                  <MuiThemeProvider>
                    <Card
                      style={styles.cardStyle}>
                      <CardHeader
                        title={teleportScore[0]}
                        subtitle={context.calculateScoreStatus(teleportScore[1]/10)}
                        avatar={
                          <Avatar
                            icon={teleportScore[2]}
                            backgroundColor={pinkA200}
                          />
                        }
                      >
                        <div
                          style={{
                            marginTop: '8px',
                            width: teleportScore[1] + '%',
                            height: '2px',
                            background: context.calculateColor(teleportScore[1] / 10)}}>
                        </div>
                      </CardHeader>
                    </Card>
                  </MuiThemeProvider>
                </div>
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
                      >
                        <div
                          style={{marginTop: '8px', width: card[1] * 10 + '%', height: '2px', background: context.calculateColor(card[1])}}>
                        </div>
                      </CardHeader>
                      {/*<CardText>
                        <div
                          style={{width: card[1] * 10 + '%', height: '2px', background: context.calculateColor(card[1])}}>
                        </div>
                      </CardText>>*/}
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
                <div
                  style={styles.growStyle}>
                  <MuiThemeProvider>
                    <ListItem
                      style={{width: '100%'}}
                      primaryText={teleportScore[0]}
                      secondaryText={context.calculateScoreStatus(teleportScore[1] / 10)}
                      disabled={true}
                      leftAvatar={
                        <Avatar
                          icon={teleportScore[2]}
                          backgroundColor={pinkA200}
                        />
                      }
                    />
                  </MuiThemeProvider>
                  <div
                    style={{width: teleportScore[1] + '%', height: '2px', background: context.calculateColor(teleportScore[1] / 10)}}>
                  </div>
                </div>
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
                  <div
                    style={{width: card[1] * 10 + '%', height: '2px', background: context.calculateColor(card[1])}}>
                  </div>
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

const mapStateToProps = (state) => ({ 
  housing: state.cityInfo.housing,
  col: state.cityInfo.col,
  health_care: state.cityInfo.health_care,
  environmental_quality: state.cityInfo.environmental_quality,
  economy: state.cityInfo.economy,
  leisure: state.cityInfo.leisure,
  commute: state.cityInfo.commute, 
  safety: state.cityInfo.safety,
  education: state.cityInfo.education,
  summary: state.cityInfo.summary,
  travel_connectivity: state.cityInfo.travel_connectivity,
  internet_access: state.cityInfo.internet_access,
  tolerance: state.cityInfo.tolerance,
  outdoors: state.cityInfo.outdoors,
  taxation: state.cityInfo.taxation, 
  business_freedom: state.cityInfo.business_freedom,
  startups: state.cityInfo.startups,
  venture_capital: state.cityInfo.venture_capital,
  photoURL: state.cityInfo.photoURL,
  city: state.cityInfo.city,
  score: state.cityInfo.score
});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchHousing: (housing) => {
      dispatch(setHousing(housing));
    },
    dispatchCol: (col) => {
      dispatch(setCol(col));
    },
    dispatchHealthcare: (health_care) => {
      dispatch(setHealthcare(health_care));
    },
    dispatchEnvironmentalQuality: (environmental_quality) => {
      dispatch(setEnvironmentalQuality(environmental_quality));
    },
    dispatchEconomy: (economy) => {
      dispatch(setEconomy(economy));
    },
    dispatchLeisure: (leisure) => {
      dispatch(setLeisure(leisure));
    },
    dispatchCommute: (commute) => {
      dispatch(setCommute(commute));
    },
    dispatchSafety: (safety) => {
      dispatch(setSafety(safety));
    },
    dispatchEducation: (education) => {
      dispatch(setEducation(education));
    },
    dispatchSummary: (summary) => {
      dispatch(setSummary(summary));
    },
    dispatchTravelConnectivity: (travel_connectivity) => {
      dispatch(setTravelConnectivity(travel_connectivity));
    },
    dispatchInternetAccess: (internet_access) => {
      dispatch(setInternetAccess(internet_access));
    },
    dispatchTolerance: (tolerance) => {
      dispatch(setTolerance(tolerance));
    },
    dispatchOutdoors: (outdoors) => {
      dispatch(setOutdoors(outdoors));
    },
    dispatchTaxation: (taxation) => {
      dispatch(setTaxation(taxation));
    },
    dispatchBusinessFreedom: (business_freedom) => {
      dispatch(setBusinessFreedom(business_freedom));
    },
    dispatchStartUps: (startups) => {
      dispatch(setStartUps(startups));
    },
    dispatchVentureCapital: (venture_capital) => {
      dispatch(setVentureCapital(venture_capital));
    },
    dispatchPhotoURL: (photoURL) => {
      dispatch(setPhotoURL(photoURL));
    },
    dispatchCity: (city) => {
      dispatch(setCity(city));
    },
    dispatchScore: (score) => {
      dispatch(setCity(score));
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(CityInfo);
