import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import QuestionCollection from './QuestionCollection.jsx';
import RaisedButton from 'material-ui/RaisedButton';
import { Card } from 'material-ui/Card';
import { white, pinkA200 } from 'material-ui/styles/colors';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { withGoogleMap, GoogleMap, Marker} from 'react-google-maps';

const GettingStartedGoogleMap = withGoogleMap(props => {
  return (
    <GoogleMap
      ref={props.onMapLoad}
      defaultZoom={4}
      defaultCenter={{ lat: 39.4146132, lng: -101.0044277 }}
      onClick={props.onMapClick}
    >
      {props.markers.map((marker) => (
        <Marker
          {...marker}
          onRightClick={() => props.onMarkerRightClick(marker)}
        />
      ))}
    </GoogleMap>
  );
});

class QuestionView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [{
        position: {
          lat: 39.4146132,
          lng: -101.0044277,
        },
        key: `United States`,
        defaultAnimation: 2,
      }],
    };

    this.handleMapLoad = this.handleMapLoad.bind(this);
    this.handleMapClick = this.handleMapClick.bind(this);
    this.handleMarkerRightClick = this.handleMarkerRightClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    //console.log('COMPARE: ', this.props.mapMarkers.length, nextProps.mapMarkers.length);
    if (this.props.mapMarkers.length !== nextProps.mapMarkers.length) {
      this.forceUpdate();
    }
  }
  handleMapLoad(map) {
    this._mapComponent = map;
    if (map) {
      console.log(map.getZoom());
    }
  }

  /*
   * This is called when you click on the map.
   * Go and try click now.
   */
  handleMapClick(event) {
    const nextMarkers = [
      ...this.state.markers,
      {
        position: event.latLng,
        defaultAnimation: 2,
        key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
      },
    ];
    this.setState({
      markers: nextMarkers,
    });

    if (nextMarkers.length === 3) {
      this.props.toast(
        `Right click on the marker to remove it`,
        `Also check the code!`
      );
    }
  }

  handleMarkerRightClick(targetMarker) {
    /*
     * All you modify is data, and the view is driven by data.
     * This is so called data-driven-development. (And yes, it's now in
     * web front end and even with google maps API.)
     */
    const nextMarkers = this.state.markers.filter(marker => marker !== targetMarker);
    this.setState({
      markers: nextMarkers,
    });
  }


  render() {
    return (
      <div className='row'>
        <div className='col-xs-7'>
          <GettingStartedGoogleMap
            containerElement={
              <div style={{ height: `700px` }} />
            }
            mapElement={
              <div style={{ height: `100%` }} />
            }
            onMapLoad={this.handleMapLoad}
            onMapClick={this.handleMapClick}
            markers={this.props.mapMarkers}
            onMarkerRightClick={this.handleMarkerRightClick}
          />
        </div>
        <div className='col-xs-5'>
          <Card
            style={styles.cardStyle}>
            <QuestionCollection handleQuestionClick={this.props.handleQuestionClick}
                                deleteQuestion={this.props.deleteQuestion}
                                destinationCity={this.props.destinationCity}
            />
          </Card>
        <FloatingActionButton
          mini={this.props.width <= 750}
          style={styles.askQuestionButton}
          onTouchTap={this.props.openQuestionDialog}
          backgroundColor={pinkA200}>
          <ContentAdd />
        </FloatingActionButton>
        </div>
      </div>
    );
  }
}

const styles = {
  cardStyle: {
    width: '35vw',
  },
  askQuestionButton: {
    margin: 0,
    right: 20,
    left: 'auto',
    top: 0,
    position: 'absolute',
  }
};

const mapStateToProps = (state) => ({
  questions: state.questionBoard.questions,
  currentUser: state.questionBoard.currentUser,
  mapMarkers: state.questionBoard.mapMarkers
});

export default connect(mapStateToProps)(QuestionView);
