import React from 'react';
import { connect } from 'react-redux';
import Answer from './Answer.jsx';

const AnswerCollection = (props) => (
  <div>
    {
      props.answers.map(answer =>
        <Answer answer={answer}
                key={answer.id} 
                deleteAnswer={props.deleteAnswer}
        />
      )
    }
  </div>
);

const mapStateToProps = (state) => ({ 
  answers: state.questionBoard.answers
});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchAnswers: (answers) => {
      dispatch(setAnswers(answers));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnswerCollection);
