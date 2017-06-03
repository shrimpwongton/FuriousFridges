import React from 'react';
import { connect } from 'react-redux';
import Question from './Question.jsx';

const QuestionCollection = (props) => (
  <div>
    {
      props.questions.map(question =>
        <Question question={question}
                  handleQuestionClick={props.handleQuestionClick}
                  key={question.id}
                  photoUrl={question.photoUrl} />
      )
    }
  </div>
);

const mapStateToProps = (state) => ({ 
  questions: state.questions
});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchQuestions: (questions) => {
      dispatch(setQuestions(questions));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionCollection);
