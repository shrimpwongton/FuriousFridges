import React from 'react';
import axios from 'axios';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {GridList, GridTile} from 'material-ui/GridList';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import MapsLocalBar from 'material-ui/svg-icons/maps/local-bar';
import {
  blueGrey300,
} from 'material-ui/styles/colors';
import {ListItem} from "material-ui/List";

class NightClub extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clubs: []
    };
  }

  componentWillReceiveProps() {
    axios.get('/nightclub')
      .then(res => {
        var sample = [];
        for (var key in res.data) {
          sample.push(res.data[key]);
        }
        this.setState({clubs: sample});
      });
  }

  render() {
    let clubs = Object.entries(this.state.clubs);

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
            primaryText="Night Clubs"
            secondaryText={'Nightlife in the area'}
            disabled={true}
            leftAvatar={
              <Avatar
                icon={<MapsLocalBar/>}
                backgroundColor={blueGrey300}
              />
            }
          />
          <Divider/>
          <GridList
            cellHeight={200}
            cols={1}
          >
            {clubs.length !== 0 ? clubs.map((club) => (
              <GridTile
                title={club[1].name}
              >
                 <a target="_blank">
                  <img src = {club[1].image} />
                </a>
              </GridTile>
            )) :
              <ListItem
                primaryText = 'No nightlife nearby'
              />
            }
          </GridList>
        </Card>
      </div>
    );
  }
}

export default NightClub;

