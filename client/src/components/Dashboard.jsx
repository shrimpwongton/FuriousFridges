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
import Spiritual from './Spiritual.jsx';
import Doctors from './Doctors.jsx';
import Masonry from 'react-masonry-component';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentFilterList from 'material-ui/svg-icons/content/filter-list';
import {
  pinkA200
} from 'material-ui/styles/colors';

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

  componentDidMount() {
    let context = this;
    setTimeout(function() {
      context.forceUpdate();
    }, 1500);
  }

  render () {
    return (
      <div
        style={{marginTop: 24, position: 'relative'}}>
        <FloatingActionButton
          backgroundColor={pinkA200}
          mini={this.props.width <= 750}
          style={{position: 'absolute', right: 24, top: 0}}>
          <ContentFilterList/>
        </FloatingActionButton>
        <div
          style={{maxWidth: 1500, margin: '0 auto'}}>
          <Masonry // default ''\
            ref={function(c) {this.masonry = this.masonry || c.masonry;}.bind(this)}
            style={{margin: '0 auto'}}
            options={{isFitWidth: true, gutter: 24}}
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
            <Gyms />
            <MeetUp/>
            <Restaurants />
            <EventCard/>
            <CraigsList />
            <NightClub />
            {/*<News />*/}
            <Spiritual />
            <Transit />
            <Doctors />
          </Masonry>
        </div>
      </div>
    );
  }
}

export default Dashboard;
