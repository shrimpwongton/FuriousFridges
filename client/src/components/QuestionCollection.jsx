import React from 'react';
import { connect } from 'react-redux';
import Question from './Question.jsx';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import CityOptions from '../CityOptions.json';
import { blueGrey700 } from 'material-ui/styles/colors';

const QuestionCollection = (props) => (
  <div>
    {/*<CardTitle title={objectKeyByValue(CityOptions, props.destinationCity)[0] + ' Q&A'} />*/}
    <CardTitle title={<span style={{'color': blueGrey700, 'fontWeight': 'bold' }}>Have a question? Ask location verified users!</span>} />
    {
      props.questions.map(question =>
        <Question question={question}
                  handleQuestionClick={props.handleQuestionClick}
                  photoUrl={question.photoUrl}
                  key={question.id}
                  deleteQuestion={props.deleteQuestion}
        />
      )
    }
  </div>
);

const objectKeyByValue = (obj, val) => {
  if ( typeof val === 'undefined' ) {
    return [''];
  }
  return Object.entries(obj).find(i => i[1] === val);
};

const mapStateToProps = (state) => ({
  questions: state.questionBoard.questions
});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchQuestions: (questions) => {
      dispatch(setQuestions(questions));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionCollection);
