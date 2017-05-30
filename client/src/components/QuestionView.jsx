import React from 'react';

class QuestionView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: []
    };

  }

  answerQuestion() {
    this.props.answerQuestion(this.props.question.id);
  }

  render() {
    return (
      <div>
        {`${this.props.question.id}) ${this.props.question.author}: ${this.props.question.body}`}
      </div>
    ); 
  }
}

export default QuestionView;