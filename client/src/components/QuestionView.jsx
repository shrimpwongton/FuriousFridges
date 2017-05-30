import React from 'react';

class QuestionView extends React.Component {
  constructor(props) {
    super(props);

    this.backToQuestions = this.backToQuestions.bind(this);
  }

  backToQuestions() {
    this.props.backToQuestions(this.props.question.id);
  }

  render() {
    return (
      <div>
        <h1>{`${this.props.question.id}) ${this.props.question.author}: ${this.props.question.body}`}</h1>
        <button onClick={this.backToQuestions}>Back to Questions</button>
        <br /><br />
      </div>
    ); 
  }
}

export default QuestionView;