import React from 'react';
import { connect } from 'react-redux';
import Answer from './Answer.jsx';

const AnswerCollection = (props) => (
  <div>
    {
      props.answers.map(answer =>
        <Answer id={answer.id}
                author={answer.author}
                body={answer.body}
                photoUrl={answer.photoUrl}
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
