import React from 'react';
import axios from 'axios';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {GridList, GridTile} from 'material-ui/GridList';
import Divider from 'material-ui/Divider';
import {
  grey500, white, green500, blueGrey300
} from 'material-ui/styles/colors';
import ActionDateRange from 'material-ui/svg-icons/action/date-range';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';


class EventCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
    };
  }

  componentWillReceiveProps() {
    axios.get('/events')
      .then(res => {
        if ( typeof res.data !== 'undefined' ) {
          let sample = [];
          for (let key in res.data) {
            sample.push(res.data[key]);
          }
          this.setState({events: sample});
        }
      });
  }


  render() {
    let events = Object.entries(this.state.events);
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
            primaryText='Events Nearby'
            secondaryText='Powered by Eventbrite'
            disabled={true}
            leftAvatar={
              <Avatar
                icon={<ActionDateRange/>}
                backgroundColor={blueGrey300}
              />
            }
          />
          <Divider/>
          <GridList
            cellHeight={200}
            cols={1}
          >
          {events.length !== 0 ? events.map((event) => (
            <GridTile
              title={event[1].description}
            >
              <a target="_blank" href={event[1].url}>
                <img style={styles.image} src={event[1].img} />
              </a>
            </GridTile>
          )) :
            <ListItem
              primaryText = 'No events in the area'
            />
          }
          </GridList>
        </Card>
      </div>
    );
  }
}

export default EventCard;
