import React from 'react';
import axios from 'axios';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import Avatar from 'material-ui/Avatar';
import NewsIcon from 'material-ui/svg-icons/action/announcement';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import {
  blueGrey300,
} from 'material-ui/styles/colors';


class News extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stories: []
    };
  }

  componentWillReceiveProps() {
    axios.get('/news')
      .then(res => {
        var sample = [];
        for (var key in res.data) {
          sample.push(res.data[key]);
        }
        this.setState({stories: sample});
      });
  }

  render() {

    const styles = {
      card: {
        margin: 8,
        overflow: 'hidden',
        width: 300,
      },
    };

    return (
      <div
        style={{marginBottom: 24}}>
        <Card
          style={styles.card}>
          <ListItem
            primaryText='New Stories'
            secondaryText={'Stories about your area'}
            disabled={true}
            leftAvatar={
              <Avatar
                icon={<NewsIcon />}
                backgroundColor={blueGrey300}
              />}
          />
          <Divider/>
          {this.state.stories !== 0 ? this.state.stories.map((story) => (
            <ListItem
              target="_blank" href={story.url}
              key={story.headline}
              primaryText={story.headline}
              leftAvatar={
                <Avatar>
                  {story.headline[0]}
                </Avatar>
              }
            />
          )) :
            <ListItem
              primaryText = 'No current news stories in the area'
            />
          }
        </Card>
      </div>
    );
  }
}

export default News;



