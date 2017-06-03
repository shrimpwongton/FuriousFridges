import React from 'react';
import {List, ListItem} from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Avatar from 'material-ui/Avatar';

const Answer = (props) => (
  <div>
    <MuiThemeProvider>
      <ListItem
        primaryText={props.body}
        secondaryText={props.author}
        disabled={true}
        leftAvatar={<Avatar src={props.photoUrl} />}
      />
    </MuiThemeProvider>
  </div>
);


export default Answer;
