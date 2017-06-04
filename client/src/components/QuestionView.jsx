import React from 'react';
import { connect } from 'react-redux';
import QuestionCollection from './QuestionCollection.jsx';
import RaisedButton from 'material-ui/RaisedButton';
import { Card } from 'material-ui/Card';
import { white, pinkA200 } from 'material-ui/styles/colors';

const QuestionView = (props) => (
  <div>
    <Card
      style={styles.cardStyle}>
      <QuestionCollection handleQuestionClick={props.handleQuestionClick} />
    </Card>
    <RaisedButton
      label='ASK A QUESTION'
      backgroundColor={pinkA200}
      labelColor={white}
      style={styles.askQuestionButton}
      onTouchTap={props.openQuestionDialog}
    />
  </div>
);

const styles = {
  cardStyle: {
    width: '75vw',
  },
  askQuestionButton: {
    margin: 0,
    right: 20,
    left: 'auto',
    top: 0,
    position: 'absolute',
  }
};

export default QuestionView;
