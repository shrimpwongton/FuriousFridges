import React from 'react';
import Question from './Question.jsx';
import QuestionForm from './QuestionForm.jsx';
import QuestionView from './QuestionView.jsx';
import AnswerForm from './AnswerForm.jsx';

class QuestionForum extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [],
      view: 'questions',
      currentQuestion: {},
      answers: []
    };

    this.addQuestion = this.addQuestion.bind(this);
    this.answerQuestion = this.answerQuestion.bind(this);    
    this.answerQuestionInView = this.answerQuestionInView.bind(this);    
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

  answerQuestion(questionId) {
    console.log('changing state to answer');
    this.setState({
      view: 'answer',
      currentQuestion: this.state.questions[questionId - 1]
    });
  }

  answerQuestionInView(answer) {
    this.setState({
      answers: this.state.answers.concat([answer])
    });
  }

  render() {
    return (
      <div>
        <QuestionForm addQuestion={this.addQuestion} />
        <div>
          {
            this.state.view === 'questions'
              ? this.state.questions.map(question => 
                  <Question question={question} answerQuestion={this.answerQuestion} key={question.id}/>
                )
              : null
          }
          {
              this.state.view === 'answer'
              ?  <div>
                  <QuestionView question={this.state.currentQuestion} answerQuestionInView={this.answerQuestionInView} key={this.state.currentQuestion}/>
                  {console.log(this.state.answers)}
                  { 
                    this.state.answers.map(answer => 
                      `${answer.id}) ${answer.author}: ${answer.body}`
                    ) 
                  }
                  <AnswerForm answerQuestionInView={this.answerQuestionInView}/>
                 </div>
              : null 
          }
        </div>
      </div>
    );
  }
}

export default QuestionForum;