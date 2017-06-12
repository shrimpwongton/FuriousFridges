import React from 'react';
import axios from 'axios';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {GridList, GridTile} from 'material-ui/GridList';
import Avatar from 'material-ui/Avatar';
import SocialGroup from 'material-ui/svg-icons/social/group';
import {
  grey500, white, green500,
} from 'material-ui/styles/colors';
import {ListItem} from "material-ui/List";
import Divider from 'material-ui/Divider';


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
        for (var key in res.data) {
          sample.push(res.data[key]);
        }
        this.setState({meetups: sample});
      });
  }


  render() {
    let meetups = Object.entries(this.state.meetups);

    const styles = {
      card: {
        margin: 8,
        overflow: 'hidden',
        maxWidth: 400,
      },
    };
    return (
      <div
        style={{flexGrow: 1}}>
        <Card
          style={styles.card}>
          <ListItem
            primaryText='Meet Ups'
            secondaryText='Find people with mutual interests'
            disabled={true}
            leftAvatar={
              <Avatar
                icon={<SocialGroup/>}
              />
            }
          />
          <Divider/>
          {meetups.map((meetup) => (
            <CardMedia
              overlay={
                <CardTitle
                  subtitle={meetup[1].name} />}
            >
              <img
                src={meetup[1].image}
                alt="" />
            </CardMedia>
          ))}
        </Card>
      </div>
    );
  }
}

export default MeetUp;
