import { SET_QUESTION,
         SET_ANSWER,
         SET_QUESTIONS,
         SET_ANSWERS,
         SET_QUESTION_DIALOG,
         SET_ERROR_TEXT,
         SET_CURRENT_QUESTION,
         SET_CURRENT_VIEW,
         SET_CURRENT_USER } from './actions';

export function setQuestion(question) {
  return { type: SET_QUESTION, payload: question };
}

export function setAnswer(answer) {
  return { type: SET_ANSWER, payload: answer };
}

export function setQuestions(questions) {
  return { type: SET_QUESTIONS, payload: questions };
}

export function setAnswers(answers) {
  return { type: SET_ANSWERS, payload: answers };
}

export function setQuestionDialog(questionDialog) {
  return { type: SET_QUESTION_DIALOG, payload: questionDialog };
}

export function setErrorText(errorText) {
  return { type: SET_ERROR_TEXT, payload: errorText };
}

export function setCurrentQuestion(currentQuestion) {
  return { type: SET_CURRENT_QUESTION, payload: currentQuestion };
}

export function setCurrentView(currentView) {
  return { type: SET_CURRENT_VIEW, payload: currentView };
}

export function setCurrentUser(currentUser) {
  return { type: SET_CURRENT_USER, payload: currentUser };
}
