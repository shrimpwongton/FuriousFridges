export const setQuestion = (question) => {
  return { type: 'SET_QUESTION', payload: question };
};

export const setAnswer = (answer) => {
  return { type: 'SET_ANSWER', payload: answer };
};

export const setQuestions = (questions) => {
  return { type: 'SET_QUESTIONS', payload: questions };
};

export const setAnswers = (answers) => {
  return { type: 'SET_ANSWERS', payload: answers };
};

export const setQuestionDialog = (questionDialog) => {
  return { type: 'SET_QUESTION_DIALOG', payload: questionDialog };
};

export const setErrorText = (errorText) => {
  return { type: 'SET_ERROR_TEXT', payload: errorText };
};

export const setCurrentQuestion = (currentQuestion) => {
  return { type: 'SET_CURRENT_QUESTION', payload: currentQuestion };
};

export const setCurrentView = (currentView) => {
  return { type: 'SET_CURRENT_VIEW', payload: currentView };
};

export const setCurrentUser = (currentUser) => {
  return { type: 'SET_CURRENT_USER', payload: currentUser };
};
