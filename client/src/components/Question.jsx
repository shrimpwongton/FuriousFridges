import React from 'react';

class Question extends React.Component {
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
        {`${this.props.author}: ${this.props.body}`}
        <button>Answer</button>
      </div>
    ); 
  }
}

export default Question;