import React from 'react';
import axios from 'axios';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {
  grey500, white, green500,
} from 'material-ui/styles/colors';
import {List, ListItem} from 'material-ui/List';
import MapsDirectionsTransit from 'material-ui/svg-icons/maps/directions-transit';
import MapsDirectionsBus from 'material-ui/svg-icons/maps/directions-bus';
import MapsTram from 'material-ui/svg-icons/maps/tram';
import MapsSubway from 'material-ui/svg-icons/maps/subway';
import MapsDirections from 'material-ui/svg-icons/maps/directions';
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
        for (var key in res.data) {
          stations.add(res.data[key]);
        }
        this.setState({stations: Array.from(stations)});
      });
  }

  render() {
    let stations = Object.entries(this.state.stations);
    const styles = {
      card: {
        margin: 8,
        overflow: 'hidden',
      },
      gridList: {
        height: 150,
        overflowY: 'auto',
      },
      avatar: {
        backgroundColor: green500,
      },
    };

    const typeMapping = {
      'bus_station': ['Bus Station', <MapsDirectionsBus/>],
      'subway_station': ['Subway Station', <MapsSubway/>],
      'light_rail_station': ['Light Rail Station', <MapsTram/>],
      'transit_station': ['Transit Hub', <MapsDirections/>],
    };


    return (
      <div
        style={{flexGrow: 1}}>
        <Card
          style={styles.card}>
          <ListItem
            primaryText='Public Transportation'
            secondaryText='Nearby Stations'
            disabled={true}
            secondaryTextLines={2}
            leftAvatar={
              <Avatar
                icon={<MapsDirectionsTransit/>}
              />
            }
          />
          <Divider/>
          {stations.map((station) => (
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
          ))}
        </Card>
      </div>
    );
  }
}

export default Transit;
