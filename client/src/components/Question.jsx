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
      <div style={styles} onClick={this.answerQuestion}>
        {`${this.props.question.id}) ${this.props.question.author}: ${this.props.question.body}`}
      </div>
    ); 
  }
}

const styles = {
  'borderStyle': 'solid',
  'width': '1000px',
  'fontSize': '24px',
  'cursor': 'pointer'
};

export default Question;