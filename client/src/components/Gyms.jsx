import React from 'react';
import axios from 'axios';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {GridList, GridTile} from 'material-ui/GridList';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import {
  blueGrey300,
} from 'material-ui/styles/colors';
import {ListItem} from "material-ui/List";
import MapsDirectionsRun from 'material-ui/svg-icons/maps/directions-run';


class Gyms extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gyms: []
    };
  }

  componentWillReceiveProps() {
    axios.get('/gyms')
      .then(res => {
        var sample = [];
        for (var key in res.data) {
          sample.push(res.data[key]);
        }
        this.setState({gyms: sample});
      });
  }

  render() {
    let gyms = Object.entries(this.state.gyms);

    const styles = {
      card: {
        margin: 8,
        overflow: 'hidden',
        width: 300,
      },
    };

    return (
      <div>
        <Card
          style={styles.card}>
          <ListItem
            primaryText="Gyms"
            secondaryText={'Stay healthy'}
            disabled={true}
            leftAvatar={
              <Avatar
                icon={<MapsDirectionsRun/>}
                backgroundColor={blueGrey300}
              />
            }
          />
          <Divider/>
          <GridList
            cellHeight={200}
            cols={1}
          >
            {gyms.length !== 0 ? gyms.map((gym) => (
              <GridTile
                title={gym[1].name}
              >
                <img src = {gym[1].image} />
              </GridTile>
            )) :
              <ListItem
                primaryText = 'No gyms in the area'
              />
            }
          </GridList>
        </Card>
      </div>
    );
  }
}

export default Gyms;

