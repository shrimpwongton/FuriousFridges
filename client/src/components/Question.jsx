import React from 'react';

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.answerQuestion = this.answerQuestion.bind(this);
  }

  answerQuestion() {
    this.props.answerQuestion(this.props.question.id);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.addQuestion(this._name.value, this._question.value);
  }

  render() {
    return (
      <div>
        {`${this.props.question.id}) ${this.props.question.author}: ${this.props.question.body}`}
        <button onClick={this.answerQuestion}>Answer</button>
      </div>
    ); 
  }
}

export default Question;