import React from 'react';
import axios from 'axios';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {GridList, GridTile} from 'material-ui/GridList';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import PlacePin from 'material-ui/svg-icons/maps/place';
import {
  blueGrey300,
} from 'material-ui/styles/colors';
import {ListItem} from "material-ui/List";

class Spiritual extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      places: []
    };
  }

  componentWillReceiveProps() {
    axios.get('/spiritual')
      .then(res => {
        var sample = [];
        for (var key in res.data) {
          sample.push(res.data[key]);
        }
        this.setState({places: sample});
      });
  }

  render() {
    //let places = Object.entries(this.state.place);

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
            primaryText="Place of Worship"
            secondaryText={'get involved in the community'}
            disabled={true}
            leftAvatar={
              <Avatar
                icon={<PlacePin/>}
                backgroundColor={blueGrey300}
              />
            }
          />
          <Divider/>
          <GridList
            cellHeight={200}
            cols={1}
          >
            {this.state.places.length !== 0 ? this.state.places.map((place) => (
              <GridTile
                title={place.name}
              >
                 <a target="_blank">
                  <img src = {place.image} />
                </a>
              </GridTile>
            )) :
              <GridTile
                title='No places of worship nearby'
              />
            }
          </GridList>
        </Card>
      </div>
    );
  }
}

export default Spiritual;

