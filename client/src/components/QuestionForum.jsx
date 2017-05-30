import React from 'react';
import Question from './Question.jsx';
import QuestionForm from './QuestionForm.jsx';

class QuestionForum extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [],
      view: 'questions'
    };

    this.addQuestion = this.addQuestion.bind(this);
    this.answerQuestion = this.answerQuestion.bind(this);    
  }

  addQuestion(author, body) {
    const question = {
      id: this.state.questions.length + 1,
      author: author,
      body: body
    };
    this.setState({
      questions: this.state.questions.concat([question])
    });
  }

  answerQuestion() {

  }

  render() {
    return (
      <div>
        <QuestionForm addQuestion={this.addQuestion} />
        <div>
          {
          this.state.view = 'questions'
            ? this.state.questions.map(question => 
                <Question author={question.author} body={question.body} answerQuestion={this.answerQuestion} />
              )
            : null
          }
        </div>
      </div>
    );
  }
}

export default QuestionForum;