import React from 'react';
import axios from 'axios';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {GridList, GridTile} from 'material-ui/GridList';
import Divider from 'material-ui/Divider';
import {
  grey500, white, green500,
} from 'material-ui/styles/colors';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import FlatButton from 'material-ui/FlatButton';


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
        height: 400,
      },
      gridList: {
        width: '100%',
        height: '80%',
        overflowY: 'auto',
      },
    };

    return (
       <div>
        <Card>
          <CardHeader
            title='Craiglist'
            subtitle={'Find furniture for you new place!'}
          />
          <Divider/>
          <List>
            {this.state.listings.map((listing) => (
              <ListItem  
                target="_blank" href={listing.url}
                key={listing.title}
                primaryText={listing.title}
                leftAvatar={<Avatar src= 'https://cdn4.iconfinder.com/data/icons/repairs-flat-icon-set/256/icon_furniture_flat-256.png'/>} 
                rightAvatar={<FlatButton label={listing.price || 'FREE!'} />}
              >
              
              </ListItem>
            ))}
          </List>
        </Card>
      </div>
    );
  }
}

export default CraigsList;