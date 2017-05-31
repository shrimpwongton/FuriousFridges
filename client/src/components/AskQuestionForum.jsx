import React from 'react';
import Question from './Question.jsx';
import QuestionForm from './QuestionForm.jsx';
import QuestionView from './QuestionView.jsx';
import Answer from './Answer.jsx';
import AnswerForm from './AnswerForm.jsx';
import $ from 'jquery';

class AskQuestionForum extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentQuestion: {},
      questions: [],
      answers: [],
      view: 'questions',
      user: null
    };

    this.addQuestion = this.addQuestion.bind(this);
    this.answerQuestion = this.answerQuestion.bind(this);    
    this.answerQuestionInView = this.answerQuestionInView.bind(this);
    this.backToQuestions = this.backToQuestions.bind(this);   
  }

  componentDidMount() {
    $.get('/authenticated', (auth) => {
      console.log('Logged in user: ', auth);
      this.setState({
        user: auth.user.display
      });
    });
  }

  addQuestion(author, body) {
    const question = {
      id: this.state.questions.length + 1,
      author,
      body,
      answers: []
    };
    this.setState({
      questions: this.state.questions.concat([question])
    });
  }

  answerQuestion(questionId) {
    this.setState({
      view: 'answer',
      currentQuestion: this.state.questions[questionId - 1],
      answers: this.state.questions[questionId - 1].answers
    });
  }

  answerQuestionInView(author, body, questionId) {
    const answer = {
      id: this.state.answers.length + 1,
      author,
      body
    };
    this.state.questions[questionId - 1].answers.push(answer);
    this.setState({
      answers: this.state.questions[questionId - 1].answers
    });
  }

  backToQuestions(questionId) {
    this.setState({
      view: 'questions'
    });
  }

  render() {
    return (
      <div>
        <div>
          {
            this.state.view === 'questions'
            ? <div>  
                <QuestionForm addQuestion={this.addQuestion} 
                              user={this.state.user} />
                {
                  this.state.questions.map(question => 
                    <Question question={question} 
                              answerQuestion={this.answerQuestion} 
                              key={question.id}/>
                  )
                }
              </div>
            : null
          }
          {
            this.state.view === 'answer'
            ?  <div>
                <QuestionView question={this.state.currentQuestion} 
                              backToQuestions={this.backToQuestions} />
                { 
                  this.state.answers.map(answer => 
                    <Answer id={answer.id} 
                            author={answer.author} 
                            body={answer.body} 
                            key={answer.id} />
                  ) 
                }
                <AnswerForm answerQuestionInView={this.answerQuestionInView} 
                            questionId={this.state.currentQuestion.id}
                            user={this.state.user} />
               </div>
            : null 
          }
        </div>
      </div>
    );
  }
}

export default AskQuestionForum;