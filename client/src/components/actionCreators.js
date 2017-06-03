import { SET_CURRENT_QUESTION} from './actions';

export function setCurrentQuestion(currentQuestion) {
  return { type: SET_CURRENT_QUESTION, payload: currentQuestion };
}