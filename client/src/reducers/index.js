import { combineReducers } from 'redux';
import questionBoard from './questionBoardReducers';

const reducer = combineReducers({
  questionBoard
});

export default reducer;
