import React from 'react';
import $ from 'jquery';
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

  //check to see if city info exists in the database
    //if it's in the db already
      //retrieve the info
    //if not, send an ajax call to server to reach out to api
    //get info and write to database and send to client


 checkForCityInfo() {
  
 }

 componentDidMount() {
    $.ajax({
      type: 'GET',
      url: '/cityinfo',
      contentType: 'application/json',
      success: (data) => {
        this.setState({
          Housing: data.categories[0].score_out_of_10,
          Cost_Of_Living: data.categories[1].score_out_of_10,
          Health_Care: data.categories[8].score_out_of_10,
          Environmental_Quality: data.categories[10].score_out_of_10,
          Economy: data.categories[11].score_out_of_10,
          Leisure_and_Culture: data.categories[14].score_out_of_10,
          Commute: data.categories[5].score_out_of_10,
          Safety: data.categories[7].score_out_of_10,
          Education: data.categories[9].score_out_of_10,
          Summary: data.summary
        })
      },
      error: function() {
        console.log('error getting data');
      }
    });
  }

  render () {
    return (
      <div>
        <p>{this.state.Summary}</p>
        <p>Housing: {this.state.Housing}</p>
        <p>Cost of Living: {this.state.Cost_of_Living}</p>
        <p>Healthcare: {this.state.Health_Care}</p>
        <p>Environmental Quality: {this.state.Environmental_Quality}</p>
        <p>Economy: {this.state.Economy}</p>
        <p>Leisure and Culture: {this.state.Leisure_and_Culture}</p>
        <p>Commute: {this.state.Commute}</p>
        <p>Safety: {this.state.Safety}</p>
        <p>Education: {this.state.Education}</p>
      </div>
    );
  }
}

export default CityInfo;
