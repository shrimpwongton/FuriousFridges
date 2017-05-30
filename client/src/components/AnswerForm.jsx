import React from 'react';

class AnswerForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.addQuestion(this._name.value, this._question.value);
  }

  render() {
    return (
      <div>
        <h1>Ask a question</h1>
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