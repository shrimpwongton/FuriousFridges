import React from 'react';
import axios from 'axios';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import SocialGroupAdd from 'material-ui/svg-icons/social/group-add';
import {
  grey500, white, green500, blueGrey300
} from 'material-ui/styles/colors';
import {ListItem} from "material-ui/List";
import Divider from 'material-ui/Divider';
import {GridList, GridTile} from 'material-ui/GridList';


class MeetUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      meetups: [],
    };
  }


  componentWillReceiveProps() {
    axios.get('/meetup')
      .then(res => {
        var sample = [];
        if ( typeof res.data !== 'undefined' ) {
          for (var key in res.data) {
            sample.push(res.data[key]);
          }
          this.setState({meetups: sample});
        }
      });
  }


  render() {
    let meetups = Object.entries(this.state.meetups);

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
            primaryText='Meet Ups'
            secondaryText='Find people with mutual interests'
            disabled={true}
            leftAvatar={
              <Avatar
                icon={<SocialGroupAdd/>}
                backgroundColor={blueGrey300}
              />
            }
          />
          <Divider/>
          <GridList
            cellHeight={200}
            cols={1}
          >
            {meetups.length !== 0 ? meetups.map((meetup) => (
              <GridTile
                title={meetup[1].name}
              >
                <img src = {meetup[1].image} />
              </GridTile>
            )) :
              <GridTile
                title='No meet ups in the area'
              />
            }
          </GridList>
        </Card>
      </div>
    );
  }
}

export default MeetUp;
