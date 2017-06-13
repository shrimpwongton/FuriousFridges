import React from 'react';
import axios from 'axios';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {
  blueGrey300
} from 'material-ui/styles/colors';
import {List, ListItem} from 'material-ui/List';
import MapsDirectionsTransit from 'material-ui/svg-icons/maps/directions-transit';
import MapsDirectionsBus from 'material-ui/svg-icons/maps/directions-bus';
import MapsTram from 'material-ui/svg-icons/maps/tram';
import MapsSubway from 'material-ui/svg-icons/maps/subway';
import MapsDirections from 'material-ui/svg-icons/maps/directions';
import MapsTrain from 'material-ui/svg-icons/maps/train';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';


class Transit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stations: []
    };
  }

  componentWillReceiveProps() {
    axios.get('/transit')
      .then(res => {
        let stations = new Set();
        if ( typeof res.data !== 'undefined' ) {
          for (var key in res.data) {
            stations.add(res.data[key]);
          }
          this.setState({stations: Array.from(stations)});
        }
      });
  }

  render() {
    let stations = Object.entries(this.state.stations);
    const styles = {
      card: {
        margin: 8,
        overflow: 'hidden',
        width: 300,
      },
    };

    const typeMapping = {
      'bus_station': ['Bus Station', <MapsDirectionsBus/>],
      'subway_station': ['Subway Station', <MapsSubway/>],
      'light_rail_station': ['Light Rail Station', <MapsTram/>],
      'transit_station': ['Transit Hub', <MapsDirections/>],
      'train_station': ['Train Station', <MapsTrain/>]
    };


    return (
      <div>
        <Card
          style={styles.card}>
          <ListItem
            primaryText='Public Transportation'
            secondaryText='Nearby Stations'
            disabled={true}
            leftAvatar={
              <Avatar
                icon={<MapsDirectionsTransit/>}
                backgroundColor={blueGrey300}
              />
            }
          />
          <Divider/>
          {stations.length !== 0 ? stations.map((station) => (
            <ListItem
              primaryText={station[1].name}
              secondaryText={typeMapping[station[1].type][0]}
              disabled={true}
              rightAvatar={
                <Avatar
                  icon={typeMapping[station[1].type][1]}
                />
              }
            />
          )) :
            <ListItem
              primaryText = 'No listings available'
            />
        }
        </Card>
      </div>
    );
  }
}

export default Transit;
