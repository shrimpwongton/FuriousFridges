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
import MapsLocalAtm from 'material-ui/svg-icons/maps/local-atm';
import SocialDomain from 'material-ui/svg-icons/social/domain';
import HardwareLaptop from 'material-ui/svg-icons/hardware/laptop';
import FileCloud from 'material-ui/svg-icons/file/cloud';
import SocialPerson from 'material-ui/svg-icons/social/person';
import CityOptions from '../CityOptions.json';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Chip from 'material-ui/Chip';
import {
  blueGrey500, pinkA100, blueGrey300, red500, orange500, amber500, lightGreen500, green500, grey500, pinkA200, grey50, blue500, cyan500, indigo500, lightBlue500, grey800, grey600
} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import $ from 'jquery';

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
      taxation: 0,
      business_freedom: 0,
      startups: 0,
      venture_capital: 0,
      score: 0,
      colArray: [],
      climate: [],
      housingArray: [],
      citySize: [],
      networkArray: [],
      pollutionArray: [],
      healthArray: [],
    };
    this.calculateColor = this.calculateColor.bind(this);
    this.calculateScoreStatus = this.calculateScoreStatus.bind(this);
    this.objectKeyByValue = this.objectKeyByValue.bind(this);
    this.convertFormat = this.convertFormat.bind(this);
  }

  convertFormat (label, data) {
    if ( label === 'Average annual percent chance of sunshine' || label === 'Average annual percent chance of clear skies') {
      return Math.floor(data * 100) + '%';
    } else if ( label === 'Average high temperature (Celsius)' || label === 'Average low temperature (Celsius)') {
      return Math.floor(data * 1.8 + 32) + '°';
    }
    return data;
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
  calculateScoreStatus (score, index) {
    if ( score > 8 ) {
      if ( index ) {
        return 'Among the most affordable';
      }
      return 'Among the best';
    } else if ( score > 6 ) {
      if ( index ) {
        return 'Somewhat affordable';
      }
      return 'Above Average';
    } else if ( score > 4.5 ) {
      return 'Around Average';
    } else if ( score > 3 ) {
      if ( index ) {
        return 'Somewhat unaffordable';
      }
      return 'Below Average';
    } else if ( score > 0 ) {
      if ( index ) {
        return 'Among the most unaffordable';
      }
      return 'Among the worst';
    } else {
      return 'Not Available';
    }
  }

  componentWillReceiveProps() {
    axios.get('/cityinfo')
      .then(res => {
        let cityInfo = JSON.parse(res.data.city_info);
        let cityDetails = JSON.parse(res.data.city_details);
        this.setState({
          housing: cityInfo.categories[0].score_out_of_10,
          col: cityInfo.categories[1].score_out_of_10,
          health_care: cityInfo.categories[8].score_out_of_10,
          environmental_quality: cityInfo.categories[10].score_out_of_10,
          economy: cityInfo.categories[11].score_out_of_10,
          leisure: cityInfo.categories[14].score_out_of_10,
          travel_connectivity: cityInfo.categories[4].score_out_of_10,
          internet_access: cityInfo.categories[13].score_out_of_10,
          tolerance: cityInfo.categories[15].score_out_of_10,
          outdoors: cityInfo.categories[16].score_out_of_10,
          commute: cityInfo.categories[5].score_out_of_10,
          safety: cityInfo.categories[7].score_out_of_10,
          education: cityInfo.categories[9].score_out_of_10,
          taxation: cityInfo.categories[12].score_out_of_10,
          business_freedom: cityInfo.categories[6].score_out_of_10,
          startups: cityInfo.categories[2].score_out_of_10,
          venture_capital: cityInfo.categories[3].score_out_of_10,
          summary: cityInfo.summary.replace(/<\/?[^>]+(>|$)/g, ''),
          score: cityInfo.teleport_city_score,
          colArray: cityDetails.categories[3].data.slice(1, cityDetails.categories[3].data.length),
          climate: cityDetails.categories[2].data.slice(0, cityDetails.categories[2].data.length - 2),
        });
      })
      .catch(err => {
        if (err.message.includes('404')) {
          console.log('USER HAS NOT REGISTERED DESTINATION CITY');
          this.props.history.push('/form');
        }
      });
    axios.get('/teleport', {
      params: { category: 'HOUSING' }
    })
      .then(res => {
        this.setState({
          housingArray: res.data[0].data,
        });
      });
    axios.get('/teleport', {
      params: { category: 'NETWORK' }
    })
      .then(res => {
        this.setState({
          networkArray: res.data[0].data,
        });
      });
    axios.get('/teleport', {
      params: { category: 'CITY-SIZE' }
    })
      .then(res => {
        this.setState({
          citySize: res.data[0].data,
        });
      });
    axios.get('/teleport', {
      params: { category: 'POLLUTION' }
    })
      .then(res => {
        this.setState({
          pollutionArray: res.data[0].data,
        });
      });
    axios.get('/teleport', {
      params: { category: 'HEALTHCARE' }
    })
      .then(res => {
        this.setState({
          healthArray: res.data[0].data,
        });
      });
    axios.get('/cityphoto')
      .then(res => {
        this.setState({
          photoURL: res.data.photos[0].image.web,
        });
      });
    axios.get('/origininfo')
      .catch(err => {
        if (err.message.includes('404')) {
          console.log('USER HAS NOT REGISTERED ORIGIN CITY');
          setTimeout(() => {
            this.props.history.push('/form');
          }, 1000);
        }
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
        margin: '16px',
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'center',
      },
      growStyle: {
        flexGrow: 1,
      },
      centerStyle: {
        width: '80%',
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'center',
      },
      leftStyle: {
        width: '80%',
        display: 'flex',
        flexFlow: 'row wrap',
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
        height: '50vh',
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
        marginLeft: '10vw',
        marginRight: '10vw',
        marginBottom: '20px',
        marginTop: '20px',
        float: 'left',
      },
      city: {
        fontFamily: "'Roboto Medium', sans-serif",
        color: grey50,
        fontSize: this.props.width > 750 ? '3em' : '2em',
      },
      summary: {
        fontFamily: "'Roboto', sans-serif",
        color: grey50,
        fontSize: '1em',
      },
      textMobile: {
        fontFamily: "'Roboto', sans-serif",
        color: grey50,
        fontSize: '0.8em',
      },
      subHeaderStyle: {
        fontFamily: "'Roboto', sans-serif",
        color: grey50,
        fontSize: '2em',
        marginLeft: '10vw',
        marginRight: '10vw',
      },
      chip: {
        margin: 4,
      },
      priceStyle: {
        fontFamily: "'Roboto', sans-serif",
        color: grey50,
        fontSize: '1em',
      },
    };
    let teleportScore = ['Teleport Score', this.state.score, <ActionHome/>];
    let cards = [
      ['Housing Affordability', this.state.housing, <ActionHome/>],
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
      ['Taxation', this.state.taxation, <MapsLocalAtm/>],
      ['Business Freedom', this.state.business_freedom, <SocialDomain/>],
      ['Startup Culture', this.state.startups, <HardwareLaptop/>],
      ['Venture Capital', this.state.venture_capital, <SocialPerson/>],
      ['Internet Access', this.state.internet_access, <ActionExplore/>]].sort((a, b) => { return b[1] - a[1]; });

    const costOfLiving = [
      ['Apples', '1kg'],
      ['Bread', 'One Loaf'],
      ['Cappuccino', 'One Cup'],
      ['Movie Ticket', 'One Admission'],
      ['Gym Membership', 'One Month'],
      ['Beer', 'One Bottle'],
      ['Public Transportation', 'Monthly Pass'],
      ['Lunch', 'One Entree'],
      ['Taxi Ride', '5km'],
      ['Dinner', '2 Entrees, Appetizer, Drinks']];
    const icons = {
      'Average day length (hours)': '/assets/default.png',
      'Average number of rainy days per year': '/assets/sleet.png',
      'Average number of clear days per year': '/assets/clear-night.png',
      'Average annual percent chance of sunshine': '/assets/clear-day.png',
      'Average annual percent chance of clear skies': '/assets/clear-night.png',
      'Average high temperature (Celsius)': <ActionTrendingUp/>,
      'Average low temperature (Celsius)': <ActionTrendingDown/>,
    };
    const climateLabels = {
      'Average day length (hours)': ['Day Length', 'Average Hours', amber500],
      'Average number of rainy days per year': ['# of Rainy Days', 'Yearly', blue500],
      'Average number of clear days per year': ['# of Clear Days', 'Yearly', cyan500],
      'Average annual percent chance of sunshine': ['% of Sunshine', 'Yearly', amber500, ],
      'Average annual percent chance of clear skies': ['% of Clear Skies', 'Yearly', cyan500],
      'Average high temperature (Celsius)': ['High Temperature', 'Average Fahrenheit', red500],
      'Average low temperature (Celsius)': ['Low Temperature', 'Average Fahrenheit', lightBlue500],
    };
    const citySize = {
      'POPULATION-SIZE' : ['Population', 'Million(s)'],
      'POPULATION-UA-CENTER-DENSITY' : ['City Density', 'People/km²'],
      'POPULATION-UA-DENSITY' : ['Metro Density', 'People/km²'],
    };
    const networkLabels = {
      'Download speed (Mbps)': ['Download Speeds', 'Mbps'],
      'Internet access (download) [Teleport score]': ['Internet Access (Download)'],
      'Upload speed (Mbps)': ['Upload speed', 'Mbps'],
      'Internet access (upload) [Teleport score]': ['Internet Access (Upload)'],
    };
    const pollutionLabels = {
      'AIR-POLLUTION-TELESCORE' : 'Air Quality',
      'CLEANLINESS-TELESCORE' : 'Cleanliness',
      'DRINKING-WATER-QUALITY-TELESCORE' : 'Water Quality',
      'URBAN-GREENERY-TELESCORE' : 'Urban Greenery',
    };
    const healthLabels = {
      'HEALTHCARE-COST-TELESCORE' : ['Healthcare Expenditure'],
      'HEALTHCARE-LIFE-EXPECTANCY' : ['Life Expectancy', 'Years'],
      'HEALTHCARE-LIFE-EXPECTANCY-TELESCORE' : ['Life Expectancy Score'],
      'HEALTHCARE-QUALITY-TELESCORE' : ['Healthcare Quality'],
    };
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
                    { this.props.width > 750 ?
                      <div>
                        <span style={styles.summary}>{this.state.summary}</span>
                      </div>
                      :
                      <div/>
                    }
                    <div
                      style={this.props.width > 750 ? styles.centerStyle : styles.mobileCenterStyle}>
                      {
                        context.state.citySize.length > 0 ? context.state.citySize.map((city, index) =>
                          <div
                            style={{
                              textAlign: 'center',
                              minWidth: this.props.width > 750 ? 120 : 80,
                              marginTop: 4}}>
                            <Paper style={{
                              height: this.props.width > 750 ? 60 : 40,
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              width: '50%',
                              margin: '0 auto',
                              backgroundColor: blueGrey300,
                            }} zDepth={1} circle={true} >
                            <span
                              style={this.props.width > 750 ? styles.summary : styles.textMobile}>
                              {city.id === 'POPULATION-SIZE' ? city.float_value.toFixed(2) : Math.floor(city.float_value)}
                            </span>
                            </Paper>
                            <div
                              style={{marginTop: 4}}>
                            <span
                              style={{color: grey50, fontFamily: "'Roboto', sans-serif", fontSize: '0.8em'}}>
                              {citySize[city.id][0]}
                            </span>
                            </div>
                            <div>
                            <span
                              style={{color: grey50, fontFamily: "'Roboto', sans-serif", fontSize: '0.6em'}}>
                              {citySize[city.id][1]}
                            </span>
                            </div>
                          </div>
                        ) :
                          <span>
                          There is no city size information.
                        </span>
                      }
                      {
                        this.props.width > 750 ?
                          <div style={styles.emptyStyle}/> :
                          <div/>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </Paper>
          </MuiThemeProvider>
          <div
            style={styles.flexStyle}>
            <div
              style={styles.leftStyle}>
              <Chip
                backgroundColor={grey50}
                onTouchTap={function() {
                  $('html, body').animate({
                    scrollTop: $('Chip#costofliving').offset().top-20
                  }, 750);
                }}
                style={styles.chip}>
                <Avatar size={32} icon={<EditorAttachMoney/>} color={grey50} backgroundColor={pinkA200}/>
                Cost of Living
              </Chip>
              <Chip
                backgroundColor={grey50}
                onTouchTap={function() {
                  $('html, body').animate({
                    scrollTop: $('#climate').offset().top-20
                  }, 750);
                }}
                style={styles.chip}>
                <Avatar size={32} icon={<FileCloud/>} color={grey50} backgroundColor={pinkA200}/>
                Climate
              </Chip>
              <Chip
                backgroundColor={grey50}
                onTouchTap={function() {
                  $('html, body').animate({
                    scrollTop: $('#housing').offset().top-20
                  }, 750);
                }}
                style={styles.chip}>
                <Avatar size={32} icon={<ActionHome/>} color={grey50} backgroundColor={pinkA200}/>
                Housing
              </Chip>
              <Chip
                backgroundColor={grey50}
                onTouchTap={function() {
                  $('html, body').animate({
                    scrollTop: $('#internetspeeds').offset().top-20
                  }, 750);
                }}
                style={styles.chip}>
                <Avatar size={32} icon={<ActionExplore/>} color={grey50} backgroundColor={pinkA200}/>
                Internet Speeds
              </Chip>
              <Chip
                backgroundColor={grey50}
                onTouchTap={function() {
                  $('html, body').animate({
                    scrollTop: $('#environmentalquality').offset().top-20
                  }, 750);
                }}
                style={styles.chip}>
                <Avatar size={32} icon={<MapsLocalFlorist/>} color={grey50} backgroundColor={pinkA200}/>
                Environmental Quality
              </Chip>
              <Chip
                backgroundColor={grey50}
                onTouchTap={function() {
                  $('html, body').animate({
                    scrollTop: $('#healthcare').offset().top-20
                  }, 750);
                }}
                style={styles.chip}>
                <Avatar size={32} icon={<ImageHealing/>} color={grey50} backgroundColor={pinkA200}/>
                Health Care
              </Chip>
            </div>
          </div>
        </div>
        {
          this.props.width > 750 ?
            <div
              style={styles.flexStyle}>
              <div
                style={styles.centerStyle}>
                <br/>
                <div
                  style={styles.growStyle}>
                  <MuiThemeProvider>
                    <Card
                      style={styles.cardStyle}>
                      <CardHeader
                        title={teleportScore[0]}
                        subtitle={context.calculateScoreStatus(teleportScore[1] / 10)}
                        avatar={
                          <Avatar
                            icon={teleportScore[2]}
                            backgroundColor={blueGrey300}
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
                {
                  this.props.width > 750 ?
                    <div style={styles.emptyStyle}/> :
                    <div/>
                }
              </div>
            </div>
            :
            <div
              style={styles.flexStyle}>
              <div
                style={styles.mobileCenterStyle}>
                <Paper
                  style={{flexGrow: 1, padding: '8px'}}>
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
                            backgroundColor={blueGrey300}
                          />
                        }
                      />
                    </MuiThemeProvider>
                    <div
                      style={{width: teleportScore[1] + '%', height: '2px', background: context.calculateColor(teleportScore[1] / 10)}}>
                    </div>
                    <Divider />
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
                      <Divider />
                      {
                        this.props.width > 750 ?
                          <div style={styles.emptyStyle}/> :
                          <div/>
                      }
                    </div>)
                  }
                </Paper>
              </div>
            </div>
        }
        <div
          style={{padding: '20px', backgroundColor: blueGrey500}}>
          <span
            id="costofliving"
            style={styles.subHeaderStyle}>
            Cost of Living
          </span>
        </div>
        <div
          style={styles.flexStyle}>
          <div
            style={this.props.width > 750 ? styles.centerStyle : styles.mobileCenterStyle}>
            {
              context.state.colArray.length > 0 ? context.state.colArray.map((colData, index) =>
                <div
                  style={styles.growStyle}>
                  <MuiThemeProvider>
                    <Card
                      style={styles.cardStyle}>
                      <ListItem
                        primaryText={costOfLiving[index][0]}
                        secondaryText={costOfLiving[index][1]}
                        disabled={true}
                        rightAvatar={
                          <Avatar
                            backgroundColor={blueGrey300}
                          >{colData.currency_dollar_value > 1 ? '$' + Math.floor(colData.currency_dollar_value) : '$' + Math.ceil(colData.currency_dollar_value)}</Avatar>
                        }
                      />
                    </Card>
                  </MuiThemeProvider>
                </div>
              ) :
                <span>
                  There is no cost of living information.
                </span>
            }
            {
              this.props.width > 750 ?
                <div style={styles.emptyStyle}/> :
                <div/>
            }
          </div>
        </div>
        <div
          style={{padding: '20px', backgroundColor: blueGrey500}}>
          <span
            id="climate"
            style={styles.subHeaderStyle}>
            Climate
          </span>
        </div>
        <div
          style={styles.flexStyle}>
          <div
            style={this.props.width > 750 ? styles.centerStyle : styles.mobileCenterStyle}>
            {
              context.state.climate.length > 0 ? context.state.climate.map((climateData, index) =>
                <div
                  style={styles.growStyle}>
                  <MuiThemeProvider>
                    <Card
                      style={{margin: 8, backgroundColor: climateLabels[climateData.label][2], overflow: 'hidden'}}>
                      <ListItem
                        primaryText={climateLabels[climateData.label][0]}
                        secondaryText={climateLabels[climateData.label][1]}
                        disabled={true}
                        style={{backgroundColor: grey50}}
                        leftAvatar={
                          !climateData.label.includes('temperature') ?
                            <Avatar
                              backgroundColor={grey50}
                              src={icons[climateData.label]}
                            /> :
                            <Avatar
                              backgroundColor={climateLabels[climateData.label][2]}
                              icon={icons[climateData.label]}
                            />}
                      />
                      <CardText
                        style={{minWidth: 200, height: this.props.width > 750 ? 125 : 75, position: 'relative', backgroundColor: climateLabels[climateData.label][2]}}>
                        <span
                          style={{right: -8, bottom: -28, position: 'absolute', fontFamily: "'Roboto Light', sans-serif", color: grey50, fontSize: '5em'}}>
                          {context.convertFormat(climateData.label, climateData[climateData.type+'_value'])}
                        </span>
                      </CardText>
                    </Card>
                  </MuiThemeProvider>
                </div>
              ) :
                <span>
                There is no climate information.
              </span>
            }
            {
              this.props.width > 750 ?
                <div style={styles.emptyStyle}/> :
                <div/>
            }
          </div>
        </div>
        <div
          style={{padding: '20px', backgroundColor: blueGrey500}}>
          <span
            id="housing"
            style={styles.subHeaderStyle}>
            Housing
          </span>
        </div>
        <div
          style={styles.flexStyle}>
          <div
            style={this.props.width > 750 ? styles.centerStyle : styles.mobileCenterStyle}>
            {
              context.state.housingArray.length > 0 ? context.state.housingArray.map((house, index) =>
                <div
                  style={styles.growStyle}>
                  <MuiThemeProvider>
                    <Card
                      style={{margin: 8, backgroundColor: house.type !== 'float' ? blueGrey300 : this.calculateColor(house.float_value * 10), overflow: 'hidden'}}>
                      <ListItem
                        primaryText={house.label}
                        secondaryText={house.type !== 'float' ? 'City center per month' : this.calculateScoreStatus(house.float_value * 10, 1)}
                        disabled={true}
                        style={{backgroundColor: grey50}}
                      />
                      <CardText
                        style={{minWidth: 200, height: this.props.width > 750 ? 125 : 75, position: 'relative', backgroundColor: house.type !== 'float' ? blueGrey300 : this.calculateColor(house.float_value*10)}}>
                        <span
                          style={{right: -8, bottom: -28, position: 'absolute', fontFamily: "'Roboto Light', sans-serif", color: grey50, fontSize: '5em'}}>
                          {house.float_value || '$' + house.currency_dollar_value}
                        </span>
                      </CardText>
                    </Card>
                  </MuiThemeProvider>
                </div>
              ) :
                <span>
                There is no housing information.
              </span>
            }
            {
              this.props.width > 750 ?
                <div style={styles.emptyStyle}/> :
                <div/>
            }
          </div>
        </div>
        <div
          style={{padding: '20px', backgroundColor: blueGrey500}}>
          <span
            id="internetspeeds"
            style={styles.subHeaderStyle}>
            Internet Speeds
          </span>
        </div>
        <div
          style={styles.flexStyle}>
          <div
            style={this.props.width > 750 ? styles.centerStyle : styles.mobileCenterStyle}>
            {
              context.state.networkArray.length > 0 ? context.state.networkArray.map((network, index) =>
                <div
                  style={styles.growStyle}>
                  <MuiThemeProvider>
                    <Card
                      style={{margin: 8, backgroundColor: network.id.includes('TELESCORE') ? this.calculateColor(network.float_value*10) : blueGrey300, overflow: 'hidden'}}>
                      <ListItem
                        primaryText={networkLabels[network.label][0]}
                        secondaryText={networkLabels[network.label][1] || this.calculateScoreStatus(network.float_value*10)}
                        disabled={true}
                        style={{backgroundColor: grey50}}
                      />
                      <CardText
                        style={{minWidth: 200, height: this.props.width > 750 ? 125 : 75, position: 'relative', backgroundColor: network.id.includes('TELESCORE') ? this.calculateColor(network.float_value*10) : blueGrey300 }}>
                        <span
                          style={{right: -8, bottom: -28, position: 'absolute', fontFamily: "'Roboto Light', sans-serif", color: grey50, fontSize: '5em'}}>
                          {network.float_value.toFixed(2)}
                        </span>
                      </CardText>
                    </Card>
                  </MuiThemeProvider>
                </div>
              ) :
                <span>
                There is no information on internet speeds
              </span>
            }
            {
              this.props.width > 750 ?
                <div style={styles.emptyStyle}/> :
                <div/>
            }
          </div>
        </div>
        <div
          style={{padding: '20px', backgroundColor: blueGrey500}}>
          <span
            id="environmentalquality"
            style={styles.subHeaderStyle}>
            Environmental Quality
          </span>
        </div>
        <div
          style={styles.flexStyle}>
          <div
            style={this.props.width > 750 ? styles.centerStyle : styles.mobileCenterStyle}>
            {
              context.state.pollutionArray.length > 0 ? context.state.pollutionArray.map((pollution, index) =>
                <div
                  style={styles.growStyle}>
                  <MuiThemeProvider>
                    <Card
                      style={{margin: 8, backgroundColor: this.calculateColor(pollution.float_value*10), overflow: 'hidden'}}>
                      <ListItem
                        primaryText={pollutionLabels[pollution.id]}
                        secondaryText={this.calculateScoreStatus(pollution.float_value*10)}
                        disabled={true}
                        style={{backgroundColor: grey50}}
                      />
                      <CardText
                        style={{minWidth: 200, height: this.props.width > 750 ? 125 : 75, position: 'relative', backgroundColor: this.calculateColor(pollution.float_value*10) }}>
                        <span
                          style={{right: -8, bottom: -28, position: 'absolute', fontFamily: "'Roboto Light', sans-serif", color: grey50, fontSize: '5em'}}>
                          {pollution.float_value.toFixed(2)}
                        </span>
                      </CardText>
                    </Card>
                  </MuiThemeProvider>
                </div>
              ) :
                <span>
                There is no information on environmental quality.
              </span>
            }
            {
              this.props.width > 750 ?
                <div style={styles.emptyStyle}/> :
                <div/>
            }
          </div>
        </div>
        <div
          style={{padding: '20px', backgroundColor: blueGrey500}}>
          <span
            id="healthcare"
            style={styles.subHeaderStyle}>
            Health Care
          </span>
        </div>
        <div
          style={styles.flexStyle}>
          <div
            style={this.props.width > 750 ? styles.centerStyle : styles.mobileCenterStyle}>
            {
              context.state.healthArray.length > 0 ? context.state.healthArray.map((health, index) =>
                <div
                  style={styles.growStyle}>
                  <MuiThemeProvider>
                    <Card
                      style={{margin: 8, backgroundColor: healthLabels[health.id][1] ? blueGrey300 : this.calculateColor(health.float_value*10), overflow: 'hidden'}}>
                      <ListItem
                        primaryText={healthLabels[health.id][0]}
                        secondaryText={healthLabels[health.id][1] || this.calculateScoreStatus(health.float_value*10)}
                        disabled={true}
                        style={{backgroundColor: grey50}}
                      />
                      <CardText
                        style={{minWidth: 200, height: this.props.width > 750 ? 125 : 75, position: 'relative', backgroundColor: healthLabels[health.id][1] ? blueGrey300 : this.calculateColor(health.float_value*10) }}>
                        <span
                          style={{right: -8, bottom: -28, position: 'absolute', fontFamily: "'Roboto Light', sans-serif", color: grey50, fontSize: '5em'}}>
                          {health.float_value.toFixed(2)}
                        </span>
                      </CardText>
                    </Card>
                  </MuiThemeProvider>
                </div>
              ) :
                <span>
                There is no health care information.
              </span>
            }
            {
              this.props.width > 750 ?
                <div style={styles.emptyStyle}/> :
                <div/>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default CityInfo;
