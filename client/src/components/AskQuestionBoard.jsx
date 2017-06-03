import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Question from './Question.jsx';
import Answer from './Answer.jsx';
import QuestionCollection from './QuestionCollection.jsx';
import AnswerCollection from './AnswerCollection.jsx';
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
import { setQuestion,
         setAnswer,
         setQuestions,
         setAnswers,
         setQuestionDialog,
         setErrorText,
         setCurrentQuestion,
         setCurrentView,
         setCurrentUser } from './actionCreators';


class AskQuestionBoard extends React.Component {
  constructor(props) {
    super(props);

    this.props = {
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
        this.props.dispatchCurrentUser(res.data);
      });
    axios.get('/questions')
      .then(res => {
        //this.props.dispatchCurrentView('questions');
        this.props.dispatchQuestions(res.data);
      });
  }

  handleQuestionDialogClose() {
    this.props.dispatchQuestionDialog(false);
    this.props.dispatchQuestion('');
    this.props.dispatchErrorText('');
  }

  handleQuestionDialogSubmit() {
    if ( this.props.question === '' ) {
      this.props.dispatchErrorText('Question cannot be empty');
    } else {
      this.props.dispatchQuestionDialog(false);
      this.addQuestion(this.props.currentUser, this.props.question);
      this.props.dispatchQuestion('');
      this.props.dispatchErrorText('');
    }
  }

  handleQuestionChange(event) {
    this.props.dispatchQuestion(event.target.value);
  }

  handleAnswerChange(event) {
    this.props.dispatchAnswer(event.target.value);
  }

  handleAnswerSubmit(event) {
    if (event.charCode === 13) {
      this.answerQuestionInView(this.props.currentUser, this.props.answer, this.props.currentQuestion.id);
      this.props.dispatchAnswer('');
    }
  }

  openQuestionDialog() {
    this.props.dispatchQuestionDialog(true);
  }

  addQuestion(author, body) {
    let email = this.props.currentUser.email;
    axios.post('/questions', {
      question: body,
      email
    })
      .then(res => {
        this.props.dispatchQuestions(this.props.questions.concat([res.data]));
      });
  }

  handleQuestionClick(questionId) {
    let currentQuestion = this.props.questions[questionId - 1];   
    axios.get('/answers', {
      params: { questionId }
    })
      .then(res => {
        let answers = res.data;
        this.props.dispatchCurrentView('answers');
        this.props.dispatchCurrentQuestion(currentQuestion);
        this.props.dispatchAnswers(answers);
      });
  }

  answerQuestionInView(author, body) {
    let currentQuestion = this.props.currentQuestion;
    let questionId = currentQuestion.id;
    let email = this.props.currentUser.email;
    axios.post('/answers', {
      answer: body,
      questionId,
      email
    })
      .then(res => {
        this.props.dispatchAnswers(this.props.answers.concat([res.data]));
      });
  }

  backToQuestions(questionId) {
    this.props.dispatchCurrentView('questions');
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
            open={this.props.questionDialog}
            onRequestClose={this.handleQuestionDialogClose}
          >
            <TextField
              value={this.props.question}
              onChange={this.handleQuestionChange}
              hintText="What is the weather like in San Francisco?"
              floatingLabelText="Question"
              errorText={this.props.errorText}
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
            this.props.currentView === 'questions'
            ? <div>
                <Card
                  style={styles.cardStyle}>
                  <QuestionCollection handleQuestionClick={this.handleQuestionClick} />
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
            this.props.currentView === 'answers'
            ? <div>
                <Card
                  style={styles.cardStyle}>
                  <IconButton
                    onTouchTap={this.backToQuestions}>
                    <NavigationArrowBack />
                  </IconButton>
                  <CardTitle
                    title={this.props.currentQuestion.body}
                    subtitle={this.props.currentQuestion.author} />
                  <AnswerCollection />
                  <ListItem
                    disabled={true}>
                    <TextField
                      floatingLabelText="Reply"
                      floatingLabelFixed={true}
                      fullWidth ={true}
                      value={this.props.answer}
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

const mapStateToProps = (state) => ({ 
  question: state.question,
  answer: state.answer,
  questions: state.questions,
  answers: state.answers,
  questionDialog: state.questionDialog,
  errorText: state.errorText,
  currentQuestion: state.currentQuestion, 
  currentView: state.currentView,
  currentUser: state.currentUser
});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchQuestion: (question) => {
      dispatch(setQuestion(question));
    },
    dispatchAnswer: (answer) => {
      dispatch(setAnswer(answer));
    },
    dispatchQuestions: (questions) => {
      dispatch(setQuestions(questions));
    },
    dispatchAnswers: (answers) => {
      dispatch(setAnswers(answers));
    },
    dispatchQuestionDialog: (questionDialog) => {
      dispatch(setQuestionDialog(questionDialog));
    },
    dispatchErrorText: (errorText) => {
      dispatch(setErrorText(errorText));
    },
    dispatchCurrentQuestion: (currentQuestion) => {
      dispatch(setCurrentQuestion(currentQuestion));
    },
    dispatchCurrentView: (currentView) => {
      dispatch(setCurrentView(currentView));
    },
    dispatchCurrentUser: (currentUser) => {
      dispatch(setCurrentUser(currentUser));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AskQuestionBoard);
