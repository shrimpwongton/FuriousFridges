import React from 'react';
import {List, ListItem} from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Avatar from 'material-ui/Avatar';

const Question = (props) => {
  const answerQuestion = () => {
    props.handleQuestionClick(props.question);    
  };
  return (
    <div onClick={answerQuestion}>
      <MuiThemeProvider>
        <ListItem
          primaryText={props.question.body}
          secondaryText={props.question.author}
          leftAvatar={<Avatar src={props.photoUrl} />}
        />
      </MuiThemeProvider>
    </div>
  );
};

export default Question;
