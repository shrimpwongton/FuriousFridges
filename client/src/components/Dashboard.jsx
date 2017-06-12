import React from 'react';
import axios from 'axios';
import EventCard from './EventCard.jsx';
import MeetUp from './MeetUp.jsx';
import Restaurants from './Restaurants.jsx';
import COLComparisonCard from './COLComparisonCard.jsx';
import Transit from './Transit.jsx';
import CraigsList from './CraigsList.jsx';
import Schools from './Schools.jsx';
import Masonry from 'react-masonry-component';

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
    });
  }

  render () {
    const styles = {
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
    /*
     <div style={styles.flexStyle}>
     <div style={styles.centerStyle}>
     <COLComparisonCard
     originArray = {this.props.colOriginArray}
     destinationArray = {this.props.colDestinationArray}
     origin={this.props.origin}
     destination={this.props.destination}/>
     <Transit />
     <MeetUp />
     <Restaurants />
     <CraigsList />
     <EventCard />
     <Schools />
    </div>
    </div>
     */
    return (
        <Masonry // default ''\
          updateOnEachImageLoad = {true}
          style={{margin: '0 auto'}}
          options={{isFitWidth: true}}
        >
          <COLComparisonCard
            originArray = {this.props.colOriginArray}
            destinationArray = {this.props.colDestinationArray}
            origin={this.props.origin}
            destination={this.props.destination}/>
          <Transit />
          <MeetUp />
          <Restaurants />
          <EventCard />
        </Masonry>
    );
  }
}

export default Dashboard;
