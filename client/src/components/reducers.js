import { SET_CURRENT_QUESTION } from './actions';

const DEFAULT_STATE = {
  currentQuestion: {}
};

const setCurrentQuestion = (state, action) => {
  return Object.assign({}, state, { currentQuestion: action.payload });
};

const rootReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_QUESTION:
      return setCurrentQuestion(state, action);
    default:
      return state;
  }
};

export default rootReducer;