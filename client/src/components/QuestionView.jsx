import React from 'react';
import { connect } from 'react-redux';
import QuestionCollection from './QuestionCollection.jsx';
import RaisedButton from 'material-ui/RaisedButton';
import { Card } from 'material-ui/Card';
import { white, pinkA200 } from 'material-ui/styles/colors';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { withGoogleMap, GoogleMap, Marker} from 'react-google-maps';

const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={3}
    defaultCenter={{ lat: -25.363882, lng: 131.044922 }}
    onClick={props.onMapClick}
  >
    {props.markers.map((marker, index) => (
      <Marker
        {...marker}
        onRightClick={() => props.onMarkerRightClick(index)}
      />
    ))}
  </GoogleMap>
));

const QuestionView = (props) => {
  let markers = [{
      position: {
        lat: 25.0112183,
        lng: 121.52067570000001,
      },
      key: `Taiwan`,
      defaultAnimation: 2,
    }]; 
  return (
   
      <div className='row full-height'>
        <div className='col-xs-7'>
          <GettingStartedGoogleMap
            containerElement={
              <div style={{ height: `100%` }} />
            }
            mapElement={
              <div style={{ height: `100%` }} />
            }
            onMapLoad={_.noop}
            onMapClick={_.noop}
            markers={markers}
            onMarkerRightClick={_.noop}
          />
        </div>
        <div className='col-xs-5'>
          <Card
            style={styles.cardStyle}>
            <QuestionCollection handleQuestionClick={props.handleQuestionClick}
                                deleteQuestion={props.deleteQuestion}
                                destinationCity={props.destinationCity}
            />
          </Card>

        <FloatingActionButton
          mini={props.width <= 750}
          style={styles.askQuestionButton}
          onTouchTap={props.openQuestionDialog}
          backgroundColor={pinkA200}>
          <ContentAdd />
        </FloatingActionButton>
        </div>
      </div>
   
  );
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

export default QuestionView;
