import React from 'react';
import axios from 'axios';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import DatePicker from 'material-ui/DatePicker';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import EventSeat from 'material-ui/svg-icons/action/event-seat';
import Avatar from 'material-ui/Avatar';
import Arrow from 'material-ui/svg-icons/navigation/arrow-forward';
import NewsIcon from 'material-ui/svg-icons/action/announcement';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import {
  grey500, white, green500,
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
        width: '100%',
        height: 400,
      },
      gridList: {
        width: '100%',
        height: '80%',
        overflowY: 'auto',
      },
      avatar: {
        backgroundColor: green500,
      },
      cardHeader: {
        height: '20%',
      },
      chart: {
        width: '80%'
      }
    }; 

    return (
      <div>
        <Card>
          <CardHeader
            title='Stay informed'
            subtitle={'lastest news stories!'}
            avatar={<NewsIcon />}
          />
          <Divider/>
          <List>
            {this.state.stories.map((story) => (
              <ListItem  
                target="_blank" href={story.url}
                key={story.headline}
                primaryText={story.headline}
              >
              
              </ListItem>
            ))}
          </List>
        </Card>
      </div>
    );
  }
}

export default News;



