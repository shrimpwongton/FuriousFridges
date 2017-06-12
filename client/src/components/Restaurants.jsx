import React from 'react';
import axios from 'axios';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import MapsLocalDining from 'material-ui/svg-icons/maps/local-dining';
import {ListItem} from "material-ui/List";
import {
  grey500, white, green500,
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
    };

    return (
      <div>
        <Card
          style={styles.card}>
          <ListItem
            primaryText='Restaurants'
            secondaryText='Explore new cuisines'
            disabled={true}
            secondaryTextLines={2}
            leftAvatar={
              <Avatar
                icon={<MapsLocalDining/>}
              />
            }
          />
          <Divider/>
          {restaurants.map((restaurant) => (
            <CardMedia
              overlay={
                <CardTitle
                  title={restaurant[1].name}
                  subtitle={'Rating: ' + restaurant[1].rating}
                />}
            >
              <img
                src={restaurant[1].image}
                alt="" />
            </CardMedia>
          ))}
        </Card>
      </div>
    );
  }
}

export default Restaurants;
