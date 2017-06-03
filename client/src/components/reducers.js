import { SET_QUESTION,
         SET_ANSWER,
         SET_QUESTIONS,
         SET_ANSWERS,
         SET_QUESTION_DIALOG,
         SET_ERROR_TEXT,
         SET_CURRENT_QUESTION,
         SET_CURRENT_VIEW,
         SET_CURRENT_USER } from './actions';

const DEFAULT_STATE = {
  question: '',
  answer: '',
  questions: [],
  answers: [],
  questionDialog: false,
  errorText: '',
  currentQuestion: {},
  currentView: 'questions',
  currentUser: {}
};

const setQuestion = (state, action) => {
  return Object.assign({}, state, { question: action.payload });
};

const setAnswer = (state, action) => {
  return Object.assign({}, state, { answer: action.payload });
};

const setQuestions = (state, action) => {
  return Object.assign({}, state, { questions: action.payload });
};

const setAnswers = (state, action) => {
  return Object.assign({}, state, { answers: action.payload });
};

const setQuestionDialog = (state, action) => {
  return Object.assign({}, state, { questionDialog: action.payload });
};

const setErrorText = (state, action) => {
  return Object.assign({}, state, { errorText: action. errorText});
};

const setCurrentQuestion = (state, action) => {
  return Object.assign({}, state, { currentQuestion: action.payload });
};

const setCurrentView = (state, action) => {
  return Object.assign({}, state, { currentView: action.payload });
};

const setCurrentUser = (state, action) => {
  return Object.assign({}, state, { currentUser: action.payload });
};

const rootReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_QUESTION:
      return setQuestion(state, action);
    case SET_ANSWER:
      return setAnswer(state, action);
    case SET_QUESTIONS:
      return setQuestions(state, action);
    case SET_ANSWERS:
      return setAnswers(state, action);
    case SET_QUESTION_DIALOG:
      return setQuestionDialog(state, action);
    case SET_ERROR_TEXT:
      return setErrorText(state, action);
    case SET_CURRENT_QUESTION:
      return setCurrentQuestion(state, action);
    case SET_CURRENT_VIEW:
      return setCurrentView(state, action);
    case SET_CURRENT_USER:
      return setCurrentUser(state, action);
    default:
      return state;
  }
};

export default rootReducer;
