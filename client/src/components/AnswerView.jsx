import React from 'react';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import TextField from 'material-ui/TextField';
import { Card, CardTitle } from 'material-ui/Card';
import { ListItem } from 'material-ui/List';
import { pinkA200 } from 'material-ui/styles/colors';
import AnswerCollection from './AnswerCollection.jsx';


const AnswerView = (props) => {
  let now = new Date();
  let created = new Date(props.currentQuestion.createdAt); 
  let elapsed = Math.floor((now - created) / 1000);
  let postTime = '';
  let timeIncrement = '';

  if (elapsed < 60) {
    if (elapsed === 0) {
      postTime = 'Just now';
    } else {
      timeIncrement = elapsed === 1 ? 'second' : 'seconds';
      postTime = `${elapsed} ${timeIncrement} ago`;
    }
  } else if (elapsed < 3600) {
    timeIncrement = Math.floor(elapsed / 60) === 1 ? 'minute' : 'minutes';
    postTime = `${Math.floor(elapsed / 60)} ${timeIncrement} ago`;
  } else if (elapsed < 86400) {
    timeIncrement = Math.floor(elapsed / 3600) === 1 ? 'hour' : 'hours';
    postTime = `${Math.floor(elapsed / 3600)} ${timeIncrement} ago`;
  } else if (elapsed < 2678400) {
    timeIncrement = Math.floor(elapsed / 86400) === 1 ? 'day' : 'days';
    postTime = `${Math.floor(elapsed / 86400)} ${timeIncrement} ago`;
  } else if (elapsed < 31536000) {
    timeIncrement = Math.floor(elapsed / 2628000) === 1 ? 'month' : 'months';
    postTime = `${Math.floor(elapsed / 2628000)} ${timeIncrement} ago`; 
  } else {
    postTime = 'More than a year ago';
  }

  return (
    <div>
      <Card
        style={styles.cardStyle}>
        <IconButton
          onTouchTap={props.backToQuestions}>
          <NavigationArrowBack />
        </IconButton>
        <CardTitle
          title={props.currentQuestion.body}
          subtitle={`${props.currentQuestion.author} · ${props.currentQuestion.location} · ${postTime}`} />
        <AnswerCollection deleteAnswer={props.deleteAnswer} />
        <ListItem
          disabled={true}>
          <TextField
            floatingLabelText="Reply"
            floatingLabelFixed={true}
            fullWidth ={true}
            value={props.answer}
            rows={2}
            multiLine={true}
            onChange={props.handleAnswerChange}
            onKeyPress={props.handleAnswerSubmit}
            underlineFocusStyle={styles.underlineStyle}
            floatingLabelFocusStyle={styles.floatingLabelStyle}
          />
        </ListItem>
      </Card>
    </div>  
  );
};

const styles = {
  cardStyle: {
    width: '35vw',
  },
  underlineStyle: {
    borderColor: pinkA200,
  },
  floatingLabelStyle: {
    color: pinkA200,
  }
};

const mapStateToProps = (state) => ({ 
  answer: state.questionBoard.answer,
  currentQuestion: state.questionBoard.currentQuestion,
});

export default connect(mapStateToProps)(AnswerView);
