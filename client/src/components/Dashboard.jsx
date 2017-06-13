import React from 'react';
import axios from 'axios';
import EventCard from './EventCard.jsx';
import MeetUp from './MeetUp.jsx';
import Restaurants from './Restaurants.jsx';
import COLComparisonCard from './COLComparisonCard.jsx';
import HousingComparisonCard from './HousingComparisonCard.jsx';
import Transit from './Transit.jsx';
import CraigsList from './CraigsList.jsx';
import Schools from './Schools.jsx';
import NightClub from './NightClub.jsx';
import Gyms from './Gyms.jsx';
import News from './News.jsx';
import Masonry from 'react-masonry-component';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colDestinationArray: [],
      colOriginArray: [],
      housingOriginArray: [],
      housingDestinationArray: [],
    };
  }
  componentWillReceiveProps() {
    this.setState({
      colDestinationArray: this.props.colDestinationArray,
      colOriginArray: this.props.colOriginArray,
      housingDestinationArray: this.props.housingDestinationArray,
      housingOriginArray: this.props.housingOriginArray,
    });
  }

  render () {
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
          options={{isFitWidth: true, gutter: 4}}
        >
          <COLComparisonCard
            originArray = {this.props.colOriginArray}
            destinationArray = {this.props.colDestinationArray}
            origin={this.props.origin}
            destination={this.props.destination}/>
          <HousingComparisonCard
            originArray = {this.props.housingOriginArray}
            destinationArray = {this.props.housingDestinationArray}
            origin={this.props.origin}
            destination={this.props.destination}/>
          <Transit />
          <MeetUp />
          <Restaurants />
          <EventCard />
          <CraigsList />
          <NightClub />
          <Gyms />
          <News />
        </Masonry>
    );
  }
}

export default Dashboard;
