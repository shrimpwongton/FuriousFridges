import React from 'react';
import axios from 'axios';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {GridList, GridTile} from 'material-ui/GridList';
import Divider from 'material-ui/Divider';
import {
  grey500, white, green500,
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
          var sample = [];
          for (var key in res.data) {
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
      gridList: {
        width: '100%',
        height: '80%',
        overflowY: 'auto',
      },
    };

    return (
       <div>
        <Card
          style={styles.card}>
          <ListItem
            primaryText='Events Nearby'
            secondaryText='Powered by Eventbrite'
            disabled={true}
            secondaryTextLines={2}
            leftAvatar={
              <Avatar
                icon={<ActionDateRange/>}
              />
            }
          />
          <Divider/>
          <GridList
            cellHeight={200}
            style={styles.gridList}
            cols={1}
          >
            {events.length !== 0 ? events.map((event) => (
              <GridTile
                title={event[1].description}
              >
                <a target="_blank" href={event[1].url}>
                <img src = {event[1].img} />
                </a>
              </GridTile>
            )) :
              <GridTile
                title='No events available'
              />
            }
          </GridList>
        </Card>
      </div>
    );
  }
}

export default EventCard;
