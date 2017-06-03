import React from 'react';
import axios from 'axios';
import Question from './Question.jsx';
import Answer from './Answer.jsx';
import AnswerForm from './AnswerForm.jsx';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {
  blueGrey500, white, pinkA200, pinkA100, grey300
} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import {List, ListItem} from 'material-ui/List';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

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
      answer: '',
      errorText: '',
    };

    this.addQuestion = this.addQuestion.bind(this);
    this.handleQuestionClick = this.handleQuestionClick.bind(this);
    this.answerQuestionInView = this.answerQuestionInView.bind(this);
    this.backToQuestions = this.backToQuestions.bind(this);
    this.handleQuestionDialogClose = this.handleQuestionDialogClose.bind(this);
    this.openQuestionDialog = this.openQuestionDialog.bind(this);
    this.handleQuestionDialogSubmit = this.handleQuestionDialogSubmit.bind(this);
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
    this.handleAnswerChange = this.handleAnswerChange.bind(this);
    this.handleAnswerSubmit = this.handleAnswerSubmit.bind(this);
  }

  componentDidMount() {
    axios.get('/createuser')
      .then(res => {
        console.log('Logged in user: ', res.data);
        this.setState({
          user: res.data
        });
      });
    axios.get('/questions')
      .then(res => {
        this.setState({
          questions: res.data
        });
      });
  }

  handleQuestionDialogClose() {
    this.setState({
      questionDialog: false,
      question: '',
      errorText: '',
    });
  }

  handleQuestionDialogSubmit() {
    if ( this.state.question === '' ) {
      this.setState({
        errorText: 'Question cannot be empty'
      });
    } else {
      this.setState({
        questionDialog: false,
      });
      this.addQuestion(this.state.user, this.state.question);
      this.setState({
        question: '',
        errorText: '',
      });
    }
  }

  handleQuestionChange(event) {
    this.setState({
      question: event.target.value,
    });
  }

  handleAnswerChange(event) {
    this.setState({
      answer: event.target.value,
    });
  }

  handleAnswerSubmit(event) {
    if (event.charCode === 13) {
      this.answerQuestionInView(this.state.user, this.state.answer, this.state.currentQuestion.id);
      this.setState({
        answer: '',
      });
    }
  }

  openQuestionDialog() {
    this.setState({
      questionDialog: true,
    });
  }

  addQuestion(author, body) {
    let email = this.state.user.email;
    axios.post('/questions', {
      question: body,
      email
    })
      .then(res => {
        this.setState({
          questions: this.state.questions.concat([res.data])
        });
      });
  }

  handleQuestionClick(questionId) {
    axios.get('/answers', {
      params: { questionId }
    })
      .then(res => {
        let currentQuestion = this.state.questions[questionId - 1];
        let answers = res.data;
        this.setState({
          view: 'answer',
          currentQuestion,
          answers
        });
      });
  }

  answerQuestionInView(author, body) {
    let currentQuestion = this.state.currentQuestion;
    let questionId = currentQuestion.id;
    let email = this.state.user.email;
    axios.post('/answers', {
      answer: body,
      questionId,
      email
    })
      .then(res => {
        this.setState({
          answers: this.state.answers.concat([res.data])
        });
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
      cardStyle: {
        width: '75vw',
      },
      fab: {
        margin: 0,
        right: 20,
        left: 'auto',
        bottom: 20,
        zIndex: 1000,
        position: 'absolute',
      },
      divStyle: {
        margin: '20px',
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      underlineStyle: {
        borderColor: pinkA200,
      },
      floatingLabelStyle: {
        color: pinkA200,
      },
    };
    const actions = [
      <FlatButton
        label="Cancel"
        onTouchTap={this.handleQuestionDialogClose}
      />,
      <FlatButton
        label="Submit"
        keyboardFocused={true}
        labelStyle={{color: pinkA200}}
        onTouchTap={this.handleQuestionDialogSubmit}
      />,
    ];
    return (
      <div>
        <div>
          <Dialog
            ref="questionField"
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
              errorText={this.state.errorText}
              floatingLabelFixed={true}
              rows={2}
              keyboardFocused={true}
              multiLine={true}
              fullWidth = {true}
              underlineFocusStyle={styles.underlineStyle}
              floatingLabelFocusStyle={styles.floatingLabelStyle}
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
                                handleQuestionClick={this.handleQuestionClick}
                                key={question.id}
                                photoUrl={question.photoUrl} />
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
            ? <div>
                <Card
                  style={styles.cardStyle}>
                  <IconButton
                    onTouchTap={this.backToQuestions}>
                    <NavigationArrowBack />
                  </IconButton>
                  <CardTitle
                    title={this.state.currentQuestion.body}
                    subtitle={this.state.currentQuestion.author} />
                  {
                    this.state.answers.map(answer =>
                      <Answer id={answer.id}
                              author={answer.author}
                              body={answer.body}
                              key={answer.id}
                              photoUrl={answer.photoUrl} />
                    )
                  }
                  <ListItem
                    disabled={true}>
                    <TextField
                      floatingLabelText="Reply"
                      floatingLabelFixed={true}
                      fullWidth ={true}
                      value={this.state.answer}
                      rows={2}
                      multiLine={true}
                      onChange={this.handleAnswerChange}
                      onKeyPress={this.handleAnswerSubmit}
                      underlineFocusStyle={styles.underlineStyle}
                      floatingLabelFocusStyle={styles.floatingLabelStyle}
                    />
                  </ListItem>
                </Card>
              </div>
            : null
          }
        </div>
      </div>
    );
  }
}

export default AskQuestionBoard;
