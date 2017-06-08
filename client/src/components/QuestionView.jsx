import React from 'react';
import { connect } from 'react-redux';
import QuestionCollection from './QuestionCollection.jsx';
import RaisedButton from 'material-ui/RaisedButton';
import { Card } from 'material-ui/Card';
import { white, pinkA200 } from 'material-ui/styles/colors';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const QuestionView = (props) => (
  <div>
    <Card
      style={styles.cardStyle}>
      <QuestionCollection handleQuestionClick={props.handleQuestionClick}
                          deleteQuestion={props.deleteQuestion}
                          destinationCity={props.destinationCity}
      />
    </Card>
    <FloatingActionButton
      mini={props.width <= 750}
      style={styles.askQuestionButton}
      onTouchTap={props.openQuestionDialog}
      backgroundColor={pinkA200}>
      <ContentAdd />
    </FloatingActionButton>
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
