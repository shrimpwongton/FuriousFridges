import React from 'react';
import Question from './Question.jsx';
import QuestionForm from './QuestionForm.jsx';
import QuestionView from './QuestionView.jsx';
import Answer from './Answer.jsx';
import AnswerForm from './AnswerForm.jsx';
import $ from 'jquery';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {
  blueGrey500, white, pinkA200,pinkA100, grey300
} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';

class AskQuestionBoard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentQuestion: {},
      questions: [],
      answers: [],
      view: 'questions',
      user: null,
      questionDialog: false,
      question: '',
    };

    this.addQuestion = this.addQuestion.bind(this);
    this.answerQuestion = this.answerQuestion.bind(this);
    this.answerQuestionInView = this.answerQuestionInView.bind(this);
    this.backToQuestions = this.backToQuestions.bind(this);
    this.handleQuestionDialogClose = this.handleQuestionDialogClose.bind(this);
    this.openQuestionDialog = this.openQuestionDialog.bind(this);
    this.handleQuestionDialogSubmit = this.handleQuestionDialogSubmit.bind(this);
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
  }

  componentDidMount() {
    $.get('/authenticated', (auth) => {
      console.log('Logged in user: ', auth);
      this.setState({
        user: auth.user.display
      });
    });
  }

  handleQuestionDialogClose() {
    this.setState({
      questionDialog: false,
    });
  }

  handleQuestionDialogSubmit() {
    this.setState({
      questionDialog: false,
    });
    this.addQuestion(this.state.user, this.state.question);
    this.setState({
      question: '',
    })
  }

  handleQuestionChange(event) {
    this.setState({
      question: event.target.value,
    });
  }

  openQuestionDialog() {
    this.setState({
      questionDialog: true,
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
    const styles = {
      askQuestionButton: {
        margin: 0,
        right: 20,
        left: 'auto',
        top: 0,
        position: 'absolute',
      },
      cardStyle:{
        width: '75vh',
      },
      divStyle: {
        margin:'20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }
    };
    const actions = [
      <FlatButton
        label="Cancel"
        onTouchTap={this.handleQuestionDialogClose}
      />,
      <FlatButton
        label="Submit"
        keyboardFocused={true}
        onTouchTap={this.handleQuestionDialogSubmit}
      />,
    ];
    return (
      <div>
        <div>
          <Dialog
            title="Ask a Question"
            modal={false}
            actions={actions}
            open={this.state.questionDialog}
            onRequestClose={this.handleQuestionDialogClose}
          >
            <TextField
              value={this.state.question}
              onChange={this.handleQuestionChange}
              hintText="What is the weather like in San Francisco?"
              floatingLabelText="Question"
              floatingLabelFixed={true}
              rows={1}
              fullWidth = {true}
            />
          </Dialog>
        </div>
        <div
          style={styles.divStyle}>
          {
            this.state.view === 'questions'
            ? <div>
                <Card
                  style={styles.cardStyle}>
                  {
                    this.state.questions.map(question =>
                      <Question question={question}
                                answerQuestion={this.answerQuestion}
                                key={question.id}/>
                    )
                  }
                </Card>
                <RaisedButton
                  label='ASK A QUESTION'
                  backgroundColor={pinkA200}
                  labelColor={white}
                  style={styles.askQuestionButton}
                  onTouchTap={this.openQuestionDialog}
                />
              </div>
            : null
          }
          {
            this.state.view === 'answer'
            ?  <div>
                <QuestionView question={this.state.currentQuestion}
                              backToQuestions={this.backToQuestions} />
                <Card
                  style={styles.cardStyle}>
                {
                  this.state.answers.map(answer =>
                    <Answer id={answer.id}
                            author={answer.author}
                            body={answer.body}
                            key={answer.id} />
                  )
                }
                </Card>
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

export default AskQuestionBoard;
