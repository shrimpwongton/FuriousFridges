import React from 'react';
import EventCard from './EventCard.jsx';
import MeetUp from './MeetUp.jsx';
import Restaurants from './Restaurants.jsx';
import COLComparisonCard from './COLComparisonCard.jsx';
import axios from 'axios';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentWillReceiveProps() {
    axios.get('/origininfo')
      .then(res => {
        let cityDetails = JSON.parse(res.data.city_details);
        this.setState({
          colOriginArray: cityDetails.categories[3].data.slice(1, cityDetails.categories[3].data.length),
        });
      });
    axios.get('/cityinfo')
      .then(res => {
        let cityDetails = JSON.parse(res.data.city_details);
        this.setState({
          colDestinationArray: cityDetails.categories[3].data.slice(1, cityDetails.categories[3].data.length),
        });
      });
  }

  render () {
    const styles = {
      flexStyle: {
        margin: '8px',
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'center',
      },
      centerStyle: {
        width: '90%',
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'center',
      },
      emptyStyle: {
        flewGrow: 1000,
      },
    };
    return (
      <div style={styles.flexStyle}>
        <div style={styles.centerStyle}>
          {/*<Restaurants />
          <MeetUp />*/}
          <COLComparisonCard
            originArray = {this.state.colOriginArray}
            destinationArray = {this.state.colDestinationArray}
            origin={this.props.origin}
            getCityInfo = {this.getCityInfo}
            destination={this.props.destination}/>
          <div style={styles.emptyStyle}/>
        </div>
      </div>
    );
  }
}

export default Dashboard;
