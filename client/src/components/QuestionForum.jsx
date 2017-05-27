import React from 'react';
import QuestionForm from './QuestionForm.jsx';

class QuestionForum extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: []
    };

    this.addQuestion = this.addQuestion.bind(this);
  }

  addQuestion(author, body) {
    const question = {
      id: this.state.questions.length + 1,
      author: author,
      body: body
    };
    console.log(question);
    this.setState({
      questions: this.state.questions.concat([question])
    });
  }

  render() {
    return (
      <div>
        <QuestionForm addQuestion={this.addQuestion} />
        <div>
          {
            this.state.questions.map(question => 
            <div>{`${question.author}: ${question.body}`}</div>)           
          }
        </div>
      </div>
    );
  }
}

export default QuestionForum;