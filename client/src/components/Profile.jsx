import React from 'react';
import {
  Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { setCurrentUser } from '../actions';
import {
  blueGrey500, white, pinkA200, pinkA100, grey300
} from 'material-ui/styles/colors';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Tabs, Tab } from 'material-ui/Tabs';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import {List, ListItem} from 'material-ui/List';
import Snackbar from 'material-ui/Snackbar';
import AskQuestionBoard from './AskQuestionBoard.jsx';
import Dashboard from './Dashboard.jsx';
import Avatar from 'material-ui/Avatar';
import CityInfo from './CityInfo.jsx';
import CityData from '../CityOptions.json';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import CircularProgress from 'material-ui/CircularProgress';
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
         setCity } from '../actions';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      snackBar: false,
      firstName: '',
      lastName: '',
      email: '',
      question: false,
      profilePic: '',
      visibilityValue: false,
      loading: false,
      spinner: true
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleVisibility = this.handleVisibility.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleNewQuestion = this.handleNewQuestion.bind(this);
    this.handleQuestionClose = this.handleQuestionClose.bind(this);
    this.handleQuestionSubmit = this.handleQuestionSubmit.bind(this);
    this.handleOriginChange = this.handleOriginChange.bind(this);
    this.handleDestinationChange = this.handleDestinationChange.bind(this);
    this.handleDescribeChange = this.handleDescribeChange.bind(this);
    this.async = this.async.bind(this);
  }

  componentDidMount() {
    this.getCurrentUserInfo();
    setTimeout(() => {
      this.setState({
        spinner: false
      });
      this.forceUpdate();
    }, 1000);
    
  }

  getCityInfo() {
    axios.get('/cityinfo')
      // .then(res => {
      //   this.props.dispatchHousing(res.data.categories[0].score_out_of_10);
      //   this.props.dispatchCol(res.data.categories[1].score_out_of_10);
      //   this.props.dispatchHealthcare(res.data.categories[8].score_out_of_10);
      //   this.props.dispatchEnvironmentalQuality(res.data.categories[10].score_out_of_10);
      //   this.props.dispatchEconomy(res.data.categories[11].score_out_of_10);
      //   this.props.dispatchLeisure(res.data.categories[14].score_out_of_10);
      //   this.props.dispatchTravelConnectivity(res.data.categories[4].score_out_of_10);
      //   this.props.dispatchInternetAccess(res.data.categories[13].score_out_of_10);
      //   this.props.dispatchTolerance(res.data.categories[15].score_out_of_10);
      //   this.props.dispatchOutdoors(res.data.categories[16].score_out_of_10);
      //   this.props.dispatchCommute(res.data.categories[5].score_out_of_10);
      //   this.props.dispatchSafety(res.data.categories[7].score_out_of_10);
      //   this.props.dispatchEducation(res.data.categories[9].score_out_of_10);
      //   this.props.dispatchTaxation(res.data.categories[12].score_out_of_10);
      //   this.props.dispatchBusinessFreedom(res.data.categories[6].score_out_of_10);
      //   this.props.dispatchStartUps(res.data.categories[2].score_out_of_10);
      //   this.props.dispatchVentureCapital(res.data.categories[3].score_out_of_10);
      //   this.props.dispatchPhotoURL(res.data.summary.replace(/<\/?[^>]+(>|$)/g, ''));
      //   this.props.dispatchSummary(res.data.categories[16].score_out_of_10);
      //   this.props.dispatchCity(res.data.teleport_city_score);
      // })
      .catch(err => {
        if (err.message.includes('404')) {
          console.log('USER HAS NOT REGISTERED DESTINATION CITY');
          setTimeout(() => {
            this.props.history.push('/form');
          }, 1000);
        }
      }); 
  }

  getCurrentUserInfo() {
    axios.get('/createuser')
      .then(res => {
        this.props.dispatchCurrentUser(res.data);
        this.setState({
          loading: false,
          originValue: res.data.origin,
          destinationValue: res.data.destination,
          describeValue: res.data.type,
          visibilityValue: res.data.visible,
          originUser: res.data.origin,
          destinationUser: res.data.destination,
          describeUser: res.data.type,
          visibilityUser: res.data.visible,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          email: res.data.email,
          id: res.data.id,
          profilePic: res.data.photoUrl,
          width: $(window).width()
        });
        this.getCityInfo();
      });
  }

  async (cb) {
    this.setState({loading: true}, () => {
      this.asyncTimer = setTimeout(cb, 400);
    });
  }

  handleToggle () {
    this.setState({
      open: !this.state.open,
    });
  }

  handleCancel () {
    this.setState({
      open: !this.state.open,
      originValue: this.state.originUser,
      destinationValue: this.state.destinationUser,
      describeValue: this.state.describeUser,
      visibilityValue: this.state.visibilityUser,
    });
  }

  handleVisibility () {
    this.setState({visibilityValue: !this.state.visibilityValue});
  }

  handleSave () {
    axios.put('/users', {
      origin: this.state.originValue,
      destination: this.state.destinationValue,
      type: this.state.describeValue,
      visible: this.state.visibilityValue,
      email: this.state.email
    })
      .then(res => {

        this.setState({
          originValue: this.state.originValue,
          destinationValue: this.state.destinationValue,
        });
        if (!this.state.loading && this.state.destinationValue !== this.state.destinationUser) {
          this.async(() => this.setState({
            loading: false,
          }));
        }
      });
    this.setState({snackBar: true, open: false});
  }
  handleClose () {
    this.setState({snackBar: false});
  }
  handleNewQuestion () {
    this.setState({question: true});
  }
  handleQuestionClose () {
    this.setState({question: false});
  }
  handleQuestionSubmit () {
    this.setState({question: false});
    // Add question here
  }
  handleOriginChange (event, index, value) {
    this.setState({
      originValue: value,
    });
  }

  handleDestinationChange (event, index, value) {
    this.setState({
      destinationValue: value,
    });
  }
  handleDescribeChange (event, index, value) {
    this.setState({
      describeValue: value,
    });
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
      tabStyle: {
        backgroundColor: blueGrey500,
        overflow: 'hidden',
      },
      headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
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
      saveButtonStyle: {
        color: pinkA200,
      },
      tabs: {
        color: blueGrey500,
      },
      tab: {
        flex: '1',
      },
    };

    if (this.state.spinner) {
      return (
        <div>
          <MuiThemeProvider>  
            <CircularProgress size={120} thickness={8} style={{'margin-left': '50%', 'left': '-65px', 'margin-top': '100px'}} />
          </MuiThemeProvider>
        </div>
      );
    } else {
      return (
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
              <IconButton
                onTouchTap={this.handleToggle}>
                <ActionSettings
                  color = {white}
                />
              </IconButton>
              <a href='/logout'>
                <FlatButton
                  style={styles.whiteTextStyle}
                  label="LOG OUT"
                />
              </a>
            </ToolbarGroup>
          </Toolbar>
        </MuiThemeProvider>
        <MuiThemeProvider>
          <Tabs
            tabItemContainerStyle={{width: '100vw'}}
            inkBarStyle={{background: pinkA200, zIndex: 500}}
            contentContainerStyle={{background: grey300}}
            style={styles.tabs}>
            <Tab
              label="DASHBOARD"
              style={styles.tabStyle}
            >
              <div>
                <Dashboard/>
              </div>
            </Tab>
            <Tab
              label="DESTINATION INFO"
              style={styles.tabStyle}
            >
              <div>
              <ExpandTransition loading={this.state.loading} open={true}>
                <CityInfo formToggle={this.props.formToggle}
                          destinationCity={this.state.destinationValue}
                          width={this.state.width}
                          history={this.props.history} />
              </ExpandTransition>
              </div>
            </Tab>
            <Tab
              label="QUESTIONS"
              style={styles.tabStyle}
            >
              <div
                style={styles.tab}
              >
                <AskQuestionBoard
                  width={this.state.width}
                  destinationCity={this.state.destinationValue}
                />
              </div>
            </Tab>
          </Tabs>
        </MuiThemeProvider>
        <MuiThemeProvider>
          <Drawer
            docked={false}
            open={this.state.open}
            width={this.state.width > 400 ? 400 : '100%'}
            openSecondary={true}
            onRequestChange={(open) => this.setState({open})} >
            <ListItem
              leftAvatar={<Avatar src={this.state.profilePic}/>}
              primaryText={this.state.firstName + ' ' + this.state.lastName}
              secondaryText={this.state.email}
              disabled={true}
            />
            <Subheader
              style={{color: blueGrey500}}>
              Origin
            </Subheader>
            <MuiThemeProvider>
              <DropDownMenu value={this.state.originValue} onChange={this.handleOriginChange}>
                {
                  Object.keys(CityData).map((city, index) =>
                    <MenuItem value={CityData[city]} primaryText={city} />
                  )
                }
              </DropDownMenu>
            </MuiThemeProvider>
            <Divider/>
            <Subheader
              style={{color: blueGrey500}}>
              Destination
            </Subheader>
            <MuiThemeProvider>
              <DropDownMenu value={this.state.destinationValue} onChange={this.handleDestinationChange}>
                {
                  Object.keys(CityData).map((city, index) =>
                    <MenuItem value={CityData[city]} primaryText={city} />
                  )
                }
              </DropDownMenu>
            </MuiThemeProvider>
            <Divider/>
            <Subheader
              style={{color: blueGrey500}}>
              Description
            </Subheader>
            <MuiThemeProvider>
              <DropDownMenu value={this.state.describeValue} onChange={this.handleDescribeChange}>
                <MenuItem value={'single'} primaryText={'Single'} />
                <MenuItem value={'couple'} primaryText={'Couple'} />
                <MenuItem value={'married'} primaryText={'Married'} />
                <MenuItem value={'parent'} primaryText={'Parent'} />
              </DropDownMenu>
            </MuiThemeProvider>
            <Divider/>
            <Subheader
              style={{color: blueGrey500}}>
              Privacy
            </Subheader>
            <ListItem primaryText="Visibility"
                      secondaryText="Profile visible to other users"
                      rightToggle={
                        <Toggle
                          thumbSwitchedStyle={styles.switchStyle}
                          trackSwitchedStyle={styles.trackStyle}
                          toggled={this.state.visibilityValue}
                          onToggle={this.handleVisibility}
                        />}
            />
            <FlatButton
              label="SAVE"
              style ={styles.saveButtonStyle}
              onTouchTap = {this.handleSave}
            />
            <FlatButton
              label="CANCEL"
              onTouchTap={this.handleCancel}
            />
          </Drawer>
        </MuiThemeProvider>
        <MuiThemeProvider>
          <Snackbar
            open={this.state.snackBar}
            message="Settings were saved"
            autoHideDuration={3000}
            action="DISMISS"
            onActionTouchTap={this.handleClose}
            onRequestClose={this.handleClose}
          />
        </MuiThemeProvider>
      </div>);
    }
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.questionBoard.currentUser,
  housing: state.cityInfo.housing,
  col: state.cityInfo.col,
  healthcare: state.cityInfo.healthcare,
  environmentalQuality: state.cityInfo.environmentalQuality,
  economy: state.cityInfo.economy,
  leisure: state.cityInfo.leisure,
  commute: state.cityInfo.commute,
  safety: state.cityInfo.safety,
  education: state.cityInfo.education,
  summary: state.cityInfo.summary,
  travelConnectivity: state.cityInfo.travelConnectivity,
  internetAccess: state.cityInfo.internetAccess,
  tolerance: state.cityInfo.tolerance,
  outdoors: state.cityInfo.outdoors,
  taxation: state.cityInfo.taxation,
  businessFreedom: state.cityInfo.businessFreedom,
  startUps: state.cityInfo.startUps,
  ventureCapital: state.cityInfo.ventureCapital,
  photoURL: state.cityInfo.photoURL,
  city: state.cityInfo.city
});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchCurrentUser: (currentUser) => {
      dispatch(setCurrentUser(currentUser));
    },
    dispatchHousing: (housing) => {
      dispatch(setHousing(housing));
    },
    dispatchCol: (col) => {
      dispatch(setCol(col));
    },
    dispatchHealthcare: (healthcare) => {
      dispatch(setHealthcare(healthcare));
    },
    dispatchEnvironmentalQuality: (environmentalQuality) => {
      dispatch(setEnvironmentalQuality(environmentalQuality));
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
    dispatchTravelConnectivity: (travelConnectivity) => {
      dispatch(setTravelConnectivity(travelConnectivity));
    },
    dispatchInternetAccess: (internetAccess) => {
      dispatch(setInternetAccess(internetAccess));
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
    dispatchBusinessFreedom: (businessFreedom) => {
      dispatch(setBusinessFreedom(businessFreedom));
    },
    dispatchStartUps: (startUps) => {
      dispatch(setStartUps(startUps));
    },
    dispatchVentureCapital: (ventureCapital) => {
      dispatch(setVentureCapital(ventureCapital));
    },
    dispatchPhotoURL: (photoURL) => {
      dispatch(setPhotoURL(photoURL));
    },
    dispatchCity: (city) => {
      dispatch(setCity(city));
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Profile);

