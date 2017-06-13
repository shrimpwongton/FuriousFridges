import React from 'react';
import axios from 'axios';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {GridList, GridTile} from 'material-ui/GridList';
import Divider from 'material-ui/Divider';
import {
  grey500, white, green500, blueGrey300
} from 'material-ui/styles/colors';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import ContentWeekend from 'material-ui/svg-icons/content/weekend';


class CraigsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: []
    };
  }

  componentWillReceiveProps() {
    axios.get('/craigslist')
      .then(res => {
        var sample = [];
        for (var key in res.data) {
          sample.push(res.data[key]);
        }
        this.setState({listings: sample.slice(0, 10)});
      });
  }


  render () {
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
            primaryText='Craigslist'
            secondaryText={'Furniture in the area'}
            disabled={true}
            leftAvatar={
              <Avatar
                icon={<ContentWeekend/>}
                backgroundColor={blueGrey300}
              />
            }
          />
          <Divider/>
          {this.state.listings.map((listing) => (
            <ListItem
              target="_blank" href={listing.url}
              primaryText={listing.title}
              secondaryText={listing.price || 'Free'}
              leftAvatar={
                <Avatar>
                  {listing.title[0]}
                </Avatar>
              }
            >
            </ListItem>
          ))}
        </Card>
      </div>
    );
  }
}

export default CraigsList;
