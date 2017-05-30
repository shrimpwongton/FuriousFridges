import React from 'react';

class AnswerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: []
    };

    this.answerQuestionInView = this.answerQuestionInView.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const answer = {
      id: this.state.answers.length + 1,
      author: this._name.value,
      body: this._answer.value
    };
    this.answerQuestionInView(answer);
    // this.setState({
    //   answers: this.state.answers.concat([answer])
    // });
  }

  answerQuestionInView(answer) {
    this.props.answerQuestionInView(answer);
  }

  render() {
    return (
      <div>
        <h1>Answer a question</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input placeholder="Name:" ref={name => this._name = name} />
            <br />
            <textarea placeholder="Answer:" ref={answer => this._answer = answer} ></textarea>
          </div>
          <button type="submit">Post</button>
        </form>
      </div>
    ); 
  }
}

export default AnswerForm;