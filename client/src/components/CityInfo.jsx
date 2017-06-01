import React from 'react';
import $ from 'jquery';
var Highcharts = require('highcharts');
require('highcharts/modules/funnel')(Highcharts);


class CityInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
			'Housing': 0,
			'Cost_of_Living': 0,
			'Healthcare': 0, 
			'Environmental_Quality': 0,
			'Economy': 0,
			'Leisure_and_Culture': 0,
			'Commute': 0, 
			'Safety': 0, 
			'Education': 0,
			'Summary': ''
		};
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
					Healthcare: data.categories[8].score_out_of_10,
					Environmental_Quality: data.categories[10].score_out_of_10,
					Economy: data.categories[11].score_out_of_10,
					Leisure_and_Culture: data.categories[14].score_out_of_10,
					Commute: data.categories[5].score_out_of_10,
					Safety: data.categories[7].score_out_of_10,
					Education: data.categories[9].score_out_of_10,
					Summary: data.summary
				});
			},
			error: function() {
				console.log('error getting data');
			}
		});
	}

	render () {
		return (
			<div>
				<div>
					{this.state.Summary}
				</div>
				<p>Housing: {Math.round((this.state.Housing + 0.00001) * 100) / 100} /10</p>
				<p>Cost of Living: {Math.round((this.state.Cost_of_Living + 0.00001) * 100) / 100} /10</p>
				<p>Healthcare: {Math.round((this.state.Health_Care + 0.00001) * 100) / 100} /10</p>
				<p>Environmental Quality: {Math.round((this.state.Environmental_Quality + 0.00001) * 100) / 100} /10</p>
				<p>Economy: {Math.round((this.state.Economy + 0.00001) * 100) / 100} /10</p>
				<p>Leisure and Culture: {Math.round((this.state.Leisure_and_Culture + 0.00001) * 100) / 100} /10</p>
				<p>Commute: {Math.round((this.state.Commute+ 0.00001) * 100) / 100} /10</p>
				<p>Safety: {Math.round((this.state.Safety + 0.00001) * 100) / 100} /10</p>
				<p>Education: {Math.round((this.state.Education + 0.00001) * 100) / 100} /10</p>
			</div>
		);
	}
}

export default CityInfo;
