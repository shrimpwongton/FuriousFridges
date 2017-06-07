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

const questionBoardReducers = (state = DEFAULT_STATE, action) => {
  if (action.type === 'SET_QUESTION') {
    return Object.assign({}, state, { question: action.payload });
  } else if (action.type === 'SET_ANSWER') {
    return Object.assign({}, state, { answer: action.payload });
  } else if (action.type === 'SET_QUESTIONS') {
    return Object.assign({}, state, { questions: action.payload });
  } else if (action.type === 'SET_ANSWERS') {
    return Object.assign({}, state, { answers: action.payload });
  } else if (action.type === 'SET_QUESTION_DIALOG') {
    return Object.assign({}, state, { questionDialog: action.payload });
  } else if (action.type === 'SET_ERROR_TEXT') {
    return Object.assign({}, state, { errorText: action.payload });
  } else if (action.type === 'SET_CURRENT_QUESTION') {
    return Object.assign({}, state, { currentQuestion: action.payload });
  } else if (action.type === 'SET_CURRENT_VIEW') {
    return Object.assign({}, state, { currentView: action.payload });
  } else if (action.type === 'SET_CURRENT_USER') {
    return Object.assign({}, state, { currentUser: action.payload });
  }
  return state;
};

export default questionBoardReducers;
