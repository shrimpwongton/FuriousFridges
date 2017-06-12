import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import _ from 'lodash';
import Question from './Question.jsx';
import Answer from './Answer.jsx';
import CityOptions from '../CityOptions.json';
import QuestionView from './QuestionView.jsx';
import AnswerView from './AnswerView.jsx';
import Dialog from 'material-ui/Dialog';
import { pinkA200 } from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { setQuestion,
         setAnswer,
         setQuestions,
         setAnswers,
         setQuestionDialog,
         setErrorText,
         setCurrentQuestion,
         setCurrentView,
         setCurrentUser,
         setMapMarkers } from '../actions';


class AskQuestionBoard extends React.Component {
  constructor(props) {
    super(props);
    this.objectKeyByValue = this.objectKeyByValue.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
    this.deleteQuestion = this.deleteQuestion.bind(this);
    this.deleteAnswer = this.deleteAnswer.bind(this);
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

  objectKeyByValue (obj, val) {
    if ( typeof val === 'undefined' ) {
      return [''];
    }
    return Object.entries(obj).find(i => i[1] === val);
  }

  componentDidMount() {
    axios.get('/questions', {
      params: { orderBy: '-created_at' }
    })
      .then(res => {
        let questions = res.data;
        // this.props.dispatchQuestions(questions);
        this.setMapMarkers(questions);
      });
  }

  setMapMarkers(questions) {
    let markers = questions.map(entry => ({ 
      position: {
        lat: entry.latitude,
        lng: entry.longitude
      },
      key: entry.location,
      defaultAnimation: 2
    }));
    this.props.dispatchMapMarkers(markers);
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
      this.answerQuestionInView(this.props.currentUser, this.props.answer);
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
        let questions = [res.data].concat(this.props.questions);
        this.props.dispatchQuestions(questions);
      });
  }

  deleteQuestion(questionId) {
    let questions = this.props.questions;
    axios.delete('/questions', {
      params: { questionId }
    })
      .then(res => {
        questions = _.reject(questions, (question) => question.id === questionId);
        this.props.dispatchQuestions(questions);
      });
  }

  deleteAnswer(answerId) {
    let answers = this.props.answers;
    axios.delete('/answers', {
      params: { answerId }
    })
      .then(res => {
        answers = _.reject(answers, (answer) => answer.id === answerId);
        this.props.dispatchAnswers(answers);
      });
  }

  handleQuestionClick(currentQuestion) {
    let questionId = currentQuestion.id;
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
        let answers = this.props.answers.concat([res.data]);
        this.props.dispatchAnswers(answers);
      });
  }

  backToQuestions(questionId) {
    this.props.dispatchCurrentView('questions');
  }

  render() {
    const styles = {
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
    let questionView = <QuestionView
      handleQuestionClick={this.handleQuestionClick}
      openQuestionDialog={this.openQuestionDialog}
      width={this.props.width}
      deleteQuestion={this.deleteQuestion}
      destinationCity={this.props.destinationCity}
    />;
    let answerView = <AnswerView
      backToQuestions={this.backToQuestions}
      handleAnswerChange={this.handleAnswerChange}
      handleAnswerSubmit={this.handleAnswerSubmit}
      deleteAnswer={this.deleteAnswer}
    />;
    const hintText = ['What is there to do in ', 'What is the climate like in ', 'How safe is it in '];
    let view;
    if (this.props.currentView === 'questions') {
      view = questionView;
    } else if (this.props.currentView === 'answers') {
      view = answerView;
    }
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
              hintText={hintText[Math.floor(Math.random() * hintText.length)] + this.objectKeyByValue(CityOptions, this.props.destinationCity)[0] + '?' }
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
        <div className='container-fluid'>
          {view}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  question: state.questionBoard.question,
  answer: state.questionBoard.answer,
  questions: state.questionBoard.questions,
  answers: state.questionBoard.answers,
  questionDialog: state.questionBoard.questionDialog,
  errorText: state.questionBoard.errorText,
  currentQuestion: state.questionBoard.currentQuestion,
  currentView: state.questionBoard.currentView,
  currentUser: state.questionBoard.currentUser,
  mapMarkers: state.questionBoard.mapMarkers
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
    },
    dispatchMapMarkers: (mapMarkers) => {
      dispatch(setMapMarkers(mapMarkers));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AskQuestionBoard);
