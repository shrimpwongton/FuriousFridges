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
      colDestinationArray: [],
      colOriginArray: [],
    };
  }
  componentWillReceiveProps() {
    this.setState({
      colDestinationArray: this.props.colDestinationArray,
      colOriginArray: this.props.colOriginArray,
    }, function() {
      console.log('orig', this.state.colOriginArray);
      console.log('dest', this.state.colDestinationArray);
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
            originArray = {this.props.colOriginArray}
            destinationArray = {this.props.colDestinationArray}
            origin={this.props.origin}
            destination={this.props.destination}/>
          <div style={styles.emptyStyle}/>
        </div>
      </div>
    );
  }
}

export default Dashboard;
