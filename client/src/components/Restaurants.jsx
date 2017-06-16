import React from 'react';
import axios from 'axios';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {GridList, GridTile} from 'material-ui/GridList';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import MapsLocalDining from 'material-ui/svg-icons/maps/local-dining';
import {ListItem} from "material-ui/List";
import {
  grey500, white, green500, blueGrey300
} from 'material-ui/styles/colors';


class Restaurants extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurants: []
    };
  }

  componentWillReceiveProps() {
    axios.get('/restaurants')
      .then(res => {
        var sample = [];
        for (var key in res.data) {
          sample.push(res.data[key]);
        }
        this.setState({restaurants: sample});
      });
  }

  render() {
    let restaurants = Object.entries(this.state.restaurants);

    const styles = {
      card: {
        margin: 8,
        overflow: 'hidden',
        width: 300,
      },
      image: {
        height: 200,
        width: 300
      }
    };

    return (
      <div
        style={{marginBottom: 24}}>
        <Card
          style={styles.card}>
          <ListItem
            primaryText='Restaurants'
            secondaryText='Explore new cuisines'
            disabled={true}
            leftAvatar={
              <Avatar
                icon={<MapsLocalDining/>}
                backgroundColor={blueGrey300}
              />
            }
          />
          <Divider/>
          <GridList
            cellHeight={200}
            cols={1}
          >
          {restaurants.length !== 0 ? restaurants.map((restaurant) => (
            <GridTile
              title={restaurant[1].name}
              subtitle={'Rating: ' + restaurant[1].rating}
            >
              <a target="_blank">
                <img style={styles.image} src={restaurant[1].image} />
              </a>
            </GridTile>
          )) :
            <ListItem
              primaryText = 'No restaurants in the area'
            />
          }
          </GridList>
        </Card>
      </div>
    );

  }
}

export default Restaurants;