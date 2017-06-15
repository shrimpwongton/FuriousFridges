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
import Dialog from 'material-ui/Dialog';
import Masonry from 'react-masonry-component';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentFilterList from 'material-ui/svg-icons/content/filter-list';
import {List, ListItem} from 'material-ui/List';
import Toggle from 'material-ui/Toggle';
import {
  pinkA200, pinkA100
} from 'material-ui/styles/colors';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colDestinationArray: [],
      colOriginArray: [],
      housingOriginArray: [],
      housingDestinationArray: [],
      filter: {
        col: true,
        housing: true,
        gyms: true,
        meetups: true,
        restaurants: true,
        events: true,
        craigslist: true,
        nightclubs: true,
        spiritual: true,
        transit: true,
        doctors: true,
      },
      savedFilter: {
        col: true,
        housing: true,
        gyms: true,
        meetups: true,
        restaurants: true,
        events: true,
        craigslist: true,
        nightclubs: true,
        spiritual: true,
        transit: true,
        doctors: true,
      },
      filterOpen: false,
    };
    this.onFilterPress = this.onFilterPress.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.setToggle = this.setToggle.bind(this);
  }

  onFilterPress () {
    this.setState({
      filterOpen: true,
    });
  }

  handleCancel () {
    this.setState({
      filterOpen: false,
    });
  }
  handleSave () {
    let obj = Object.assign({}, this.state.savedFilter);
    this.setState({
      filter: obj,
      filterOpen: false,
    }, function() {
      this.forceUpdate();
    });
  }

  setToggle (event, input) {
    let obj = this.state.savedFilter;
    obj[event.target.id] = input;
    this.setState({
      savedFilter: obj
    });
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
    const styles={
      switchStyle: {
        backgroundColor: pinkA200,
      },
      trackStyle: {
        backgroundColor: pinkA100,
      },
    };
    const actions = [
      <FlatButton
        label="Cancel"
        onTouchTap={this.handleCancel}
      />,
      <FlatButton
        label="Save"
        keyboardFocused={true}
        labelStyle={{color: pinkA200}}
        onTouchTap={this.handleSave}
      />];
    return (
      <div>
        <div>
          <Dialog
            title="Filter Cards"
            modal={true}
            actions={actions}
            open={this.state.filterOpen}
            onRequestClose={this.handleCancel}
            autoScrollBodyContent={true}>
            <ListItem primaryText="Cost of Living Comparison"
                      secondaryText='Percentage change of cost of living'
                      rightToggle={
                        <Toggle
                          id="col"
                          toggled={this.state.savedFilter.col}
                          onToggle={this.setToggle}
                          thumbSwitchedStyle={styles.switchStyle}
                          trackSwitchedStyle={styles.trackStyle}
                        />} />
            <ListItem primaryText="Housing Comparison"
                      secondaryText='Percentage change of housing prices'
                      rightToggle={
                        <Toggle
                          id='housing'
                          toggled={this.state.savedFilter.housing}
                          onToggle={this.setToggle}
                          thumbSwitchedStyle={styles.switchStyle}
                          trackSwitchedStyle={styles.trackStyle}
                        />} />
            <ListItem primaryText="Gyms"
                      secondaryText='Gyms in the area'
                      rightToggle={
                        <Toggle
                          id='gyms'
                          toggled={this.state.savedFilter.gyms}
                          onToggle={this.setToggle}
                          thumbSwitchedStyle={styles.switchStyle}
                          trackSwitchedStyle={styles.trackStyle}
                        />} />
            <ListItem primaryText="Meet Ups"
                      secondaryText='Meet with people with similar interests'
                      rightToggle={
                        <Toggle
                          id='meetups'
                          toggled={this.state.savedFilter.meetups}
                          onToggle={this.setToggle}
                          thumbSwitchedStyle={styles.switchStyle}
                          trackSwitchedStyle={styles.trackStyle}
                        />} />
            <ListItem primaryText="Restaurants"
                      secondaryText='Find new places to eat'
                      rightToggle={
                        <Toggle
                          id='restaurants'
                          toggled={this.state.savedFilter.restaurants}
                          onToggle={this.setToggle}
                          thumbSwitchedStyle={styles.switchStyle}
                          trackSwitchedStyle={styles.trackStyle}
                        />} />
            <ListItem primaryText="Events"
                      secondaryText='Find events that suit you'
                      rightToggle={
                        <Toggle
                          id='events'
                          toggled={this.state.savedFilter.events}
                          onToggle={this.setToggle}
                          thumbSwitchedStyle={styles.switchStyle}
                          trackSwitchedStyle={styles.trackStyle}
                        />} />
            <ListItem primaryText="Craigslist"
                      secondaryText='Buy furniture from Craigslist'
                      rightToggle={
                        <Toggle
                          id='craigslist'
                          toggled={this.state.savedFilter.craigslist}
                          onToggle={this.setToggle}
                          thumbSwitchedStyle={styles.switchStyle}
                          trackSwitchedStyle={styles.trackStyle}
                        />} />
            <ListItem primaryText="Night Life"
                      secondaryText='Find the best places to party'
                      rightToggle={
                        <Toggle
                          id='nightclubs'
                          toggled={this.state.savedFilter.nightclubs}
                          onToggle={this.setToggle}
                          thumbSwitchedStyle={styles.switchStyle}
                          trackSwitchedStyle={styles.trackStyle}
                        />} />
            <ListItem primaryText="Spiritual"
                      secondaryText='Find places of worship'
                      rightToggle={
                        <Toggle
                          id='spiritual'
                          toggled={this.state.savedFilter.spiritual}
                          onToggle={this.setToggle}
                          thumbSwitchedStyle={styles.switchStyle}
                          trackSwitchedStyle={styles.trackStyle}
                        />} />
            <ListItem primaryText="Transit"
                      secondaryText='See public transportation options'
                      rightToggle={
                        <Toggle
                          id='transit'
                          toggled={this.state.savedFilter.transit}
                          onToggle={this.setToggle}
                          thumbSwitchedStyle={styles.switchStyle}
                          trackSwitchedStyle={styles.trackStyle}
                        />} />
            <ListItem primaryText="Doctors"
                      secondaryText='See what doctors are nearby'
                      rightToggle={
                        <Toggle
                          id='doctors'
                          toggled={this.state.savedFilter.doctors}
                          onToggle={this.setToggle}
                          thumbSwitchedStyle={styles.switchStyle}
                          trackSwitchedStyle={styles.trackStyle}
                        />} />
          </Dialog>
        </div>
        <div
          style={{marginTop: 24, position: 'relative'}}>
          <FloatingActionButton
            backgroundColor={pinkA200}
            mini={this.props.width <= 750}
            style={{position: 'absolute', right: 24, top: 0}}
            onTouchTap={this.onFilterPress}>
            <ContentFilterList/>
          </FloatingActionButton>
          <div
            style={{maxWidth: 1500, margin: '0 auto'}}>
            <Masonry // default ''\
              ref={function(c) {this.masonry = this.masonry || c.masonry;}.bind(this)}
              style={{margin: '0 auto'}}
              options={{isFitWidth: true, gutter: 24}}
            >
              {this.state.filter.col ?
                <COLComparisonCard
                  originArray={this.props.colOriginArray}
                  destinationArray={this.props.colDestinationArray}
                  origin={this.props.origin}
                  destination={this.props.destination}/> :
                null
              }
              {this.state.filter.housing ?
                <HousingComparisonCard
                originArray = {this.props.housingOriginArray}
                destinationArray = {this.props.housingDestinationArray}
                origin={this.props.origin}
                destination={this.props.destination}/> :
                null
              }
              {this.state.filter.gyms ?
                <Gyms/> : null
              }
              {this.state.filter.meetups ?
                <MeetUp/> : null }
              {this.state.filter.restaurants ?
                <Restaurants/> : null }
              {this.state.filter.events ?
                <EventCard/> : null }
              {this.state.filter.craigslist ?
                <CraigsList/> : null }
              {this.state.filter.nightclubs ?
                <NightClub/> : null }
              {/*<News />*/}
              {this.state.filter.spiritual ?
                <Spiritual/> : null }
              {this.state.filter.transit ?
                <Transit/> : null }
              {this.state.filter.doctors ?
                <Doctors/> : null }
            </Masonry>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
