import React from 'react';
import {List, ListItem} from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Avatar from 'material-ui/Avatar';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';

const Answer = (props) => (
  <div>
    <MuiThemeProvider>
      <ListItem
        primaryText={props.body}
        secondaryText={props.author}
        disabled={true}
        leftAvatar={<Avatar src={props.photoUrl} />}
        rightIconButton={
          <IconMenu
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
          >
            <MenuItem
              primaryText="Delete"
              onTouchTap={() => { props.deleteAnswer(props.id); }}
            />
          </IconMenu>
        }
      />
    </MuiThemeProvider>
  </div>
);


export default Answer;
