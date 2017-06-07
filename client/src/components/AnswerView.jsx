import React from 'react';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Card, CardTitle } from 'material-ui/Card';
import { ListItem } from 'material-ui/List';
import { pinkA200 } from 'material-ui/styles/colors';
import AnswerCollection from './AnswerCollection.jsx';


const AnswerView = (props) => (
  <div>
    <Card
      style={styles.cardStyle}>
      <IconButton
        onTouchTap={props.backToQuestions}>
        <NavigationArrowBack />
      </IconButton>
      <CardTitle
        title={props.currentQuestion.body}
        subtitle={props.currentQuestion.author} />
      <AnswerCollection />
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

const styles = {
  cardStyle: {
    width: '75vw',
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