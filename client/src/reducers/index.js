import { combineReducers } from 'redux';
import questionBoard from './questionBoardReducers';
import cityInfo from './cityInfoReducers';

const reducer = combineReducers({
  questionBoard,
  cityInfo

});

export default reducer;
