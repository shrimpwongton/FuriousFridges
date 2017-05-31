import React from 'react';

class QuestionForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.addQuestion(this.props.user, this._question.value);
  }

  render() {
    return (
      <div>
        <h2>Ask a question</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <textarea placeholder="Question:" ref={question => this._question = question} ></textarea>
          </div>
          <button type="submit">Post</button>
        </form>
        <br /><br />
      </div>
    ); 
  }
}

export default QuestionForm;