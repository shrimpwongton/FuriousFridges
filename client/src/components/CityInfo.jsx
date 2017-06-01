import React from 'react';
import $ from 'jquery';
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
import SocialGroup from 'material-ui/svg-icons/social/group';
import {
  amber500, green500, lightGreen500, orange500, red500,
} from 'material-ui/styles/colors';
var Highcharts = require('highcharts');

require('highcharts/modules/funnel')(Highcharts);


class CityInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			"Housing": 0,
			"Cost_of_Living": 0,
			"Health_Care": 0,
			"Environmental_Quality": 0,
			"Economy": 0,
			"Leisure_and_Culture": 0,
			"Commute": 0,
			"Safety": 0,
			"Education": 0,
			"Summary": ''
		};
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
    } else {
      return red500;
    }
  }

  componentWillMount() {
    $.ajax({
      type: 'GET',
      url: '/cityinfo',
      contentType: 'application/json',
      success: (data) => {
        this.setState({
          housing: data.categories[0].score_out_of_10,
          col: data.categories[1].score_out_of_10,
          health_care: data.categories[8].score_out_of_10,
          environmental_quality: data.categories[10].score_out_of_10,
          economy: data.categories[11].score_out_of_10,
          leisure: data.categories[14].score_out_of_10,
          travel_connectivity: data.categories[4].score_out_of_10,
          internet_access: data.categories[13].score_out_of_10,
          tolerance: data.categories[15].score_out_of_10,
          outdoors: data.categories[16].score_out_of_10,
          commute: data.categories[5].score_out_of_10,
          safety: data.categories[7].score_out_of_10,
          education: data.categories[9].score_out_of_10,
          summary: data.summary.replace(/<\/?[^>]+(>|$)/g, ''),
        });
      },
      error: function() {
        console.log('error getting data');
      }
    });
  }

  render () {
    const styles = {
      cardStyle: {
        margin: '8px',
      },
      divStyle: {
        margin: '8px',
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
      },
      growStyle: {
        flexGrow: 1,
      },
      emptyStyle: {
        flexGrow: 1000,
      }
    };
    return (
    <div
      style={styles.divStyle}>
      <div
        style={styles.growStyle}>
        <MuiThemeProvider>
          <Card
            style={styles.cardStyle}>
            <CardHeader
              title="Housing Affordability"
              subtitle={this.calculateScoreStatus(this.state.housing)}
              avatar={
                <Avatar
                  icon={<ActionHome />}
                  backgroundColor={this.calculateColor(this.state.housing)}
                />
              }
            />
            <CardTitle title={this.state.housing.toFixed(2) + '/10'} />
          </Card>
        </MuiThemeProvider>
      </div>
      <div
        style={styles.growStyle}>
        <MuiThemeProvider>
          <Card
            style={styles.cardStyle}>
            <CardHeader
              title="Health Care"
              subtitle={this.calculateScoreStatus(this.state.health_care)}
              avatar={
                <Avatar icon={<ImageHealing />}
                        backgroundColor={this.calculateColor(this.state.health_care)}
                />
              }
            />
            <CardTitle title={this.state.health_care.toFixed(2) + '/10'} />
          </Card>
        </MuiThemeProvider>
      </div>
      <div
        style={styles.growStyle}>
        <MuiThemeProvider>
          <Card
            style={styles.cardStyle}>
            <CardHeader
              title="Environment Quality"
              subtitle={this.calculateScoreStatus(this.state.environmental_quality)}
              avatar={
                <Avatar icon={<MapsLocalFlorist />}
                        backgroundColor={this.calculateColor(this.state.environmental_quality)}
                />
              }
            />
            <CardTitle title={this.state.environmental_quality.toFixed(2) + '/10'} />
          </Card>
        </MuiThemeProvider>
      </div>
      <div
        style={styles.growStyle}>
        <MuiThemeProvider>
          <Card
            style={styles.cardStyle}>
            <CardHeader
              title="Economy"
              subtitle={this.calculateScoreStatus(this.state.economy)}
              avatar={
                <Avatar icon={<EditorAttachMoney />}
                        backgroundColor={this.calculateColor(this.state.economy)}
                />
              }
            />
            <CardTitle title={this.state.economy.toFixed(2) + '/10'} />
          </Card>
        </MuiThemeProvider>
      </div>
      <div
        style={styles.growStyle}>
        <MuiThemeProvider>
          <Card
            style={styles.cardStyle}>
            <CardHeader
              title="Leisure and Culture"
              subtitle={this.calculateScoreStatus(this.state.leisure)}
              avatar={
                <Avatar icon={<MapsLocalBar />}
                        backgroundColor={this.calculateColor(this.state.leisure)}
                />
              }
            />
            <CardTitle title={this.state.leisure.toFixed(2) + '/10'} />
          </Card>
        </MuiThemeProvider>
      </div>
      <div
        style={styles.growStyle}>
        <MuiThemeProvider>
          <Card
            style={styles.cardStyle}>
            <CardHeader
              title="Commute"
              subtitle={this.calculateScoreStatus(this.state.commute)}
              avatar={
                <Avatar icon={<MapsDirectionsCar />}
                        backgroundColor={this.calculateColor(this.state.commute)}
                />
              }
            />
            <CardTitle title={this.state.commute.toFixed(2) + '/10'} />
          </Card>
        </MuiThemeProvider>
      </div>
      <div
        style={styles.growStyle}>
        <MuiThemeProvider>
          <Card
            style={styles.cardStyle}>
            <CardHeader
              title="Safety"
              subtitle={this.calculateScoreStatus(this.state.safety)}
              avatar={
                <Avatar icon={<SocialPublic />}
                        backgroundColor={this.calculateColor(this.state.safety)}
                />
              }
            />
            <CardTitle title={this.state.safety.toFixed(2) + '/10'} />
          </Card>
        </MuiThemeProvider>
      </div>
      <div
        style={styles.growStyle}>
        <MuiThemeProvider>
          <Card
            style={styles.cardStyle}>>
            <CardHeader
              title="Education"
              subtitle={this.calculateScoreStatus(this.state.education)}
              avatar={
                <Avatar icon={<MapsLocalLibrary />}
                        backgroundColor={this.calculateColor(this.state.education)}
                />
              }
            />
            <CardTitle title={this.state.education.toFixed(2) + '/10'} />
          </Card>
        </MuiThemeProvider>
      </div>
      <div
        style={styles.growStyle}>
        <MuiThemeProvider>
          <Card
            style={styles.cardStyle}>>
            <CardHeader
              title="Tolerance"
              subtitle={this.calculateScoreStatus(this.state.tolerance)}
              avatar={
                <Avatar icon={<SocialGroup />}
                        backgroundColor={this.calculateColor(this.state.tolerance)}
                />
              }
            />
            <CardTitle title={this.state.tolerance.toFixed(2) + '/10'} />
          </Card>
        </MuiThemeProvider>
      </div>
      <div
        style={styles.growStyle}>
        <MuiThemeProvider>
          <Card
            style={styles.cardStyle}>>
            <CardHeader
              title="Air and Rail Connectivity"
              subtitle={this.calculateScoreStatus(this.state.travel_connectivity)}
              avatar={
                <Avatar icon={<MapsDirectionsTransit />}
                        backgroundColor={this.calculateColor(this.state.travel_connectivity)}
                />
              }
            />
            <CardTitle title={this.state.travel_connectivity.toFixed(2) + '/10'} />
          </Card>
        </MuiThemeProvider>
      </div>
      <div
        style={styles.growStyle}>
        <MuiThemeProvider>
          <Card
            style={styles.cardStyle}>>
            <CardHeader
              title="Outdoors"
              subtitle={this.calculateScoreStatus(this.state.outdoors)}
              avatar={
                <Avatar icon={<MapsTerrain />}
                        backgroundColor={this.calculateColor(this.state.outdoors)}
                />
              }
            />
            <CardTitle title={this.state.outdoors.toFixed(2) + '/10'} />
          </Card>
        </MuiThemeProvider>
      </div>
      <div style={styles.emptyStyle}/>
      <p>{this.state.summary}</p>
    </div>
    );
  }
}

export default CityInfo;
