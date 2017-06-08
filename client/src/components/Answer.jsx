import React from 'react';
import {List, ListItem} from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import { white, pinkA200 } from 'material-ui/styles/colors';

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
    <RaisedButton
        label='Delete Answer'
        backgroundColor={pinkA200}
        labelColor={white}
        onTouchTap={() => { props.deleteAnswer(props.id); }}
    />
  </div>
);


export default Answer;
