import { combineReducers } from 'redux';
import questionBoard from './questionBoardReducers';
import cityInfo from './cityInfoReducers';
import profile from './profileReducers';

const reducer = combineReducers({
  questionBoard,
  cityInfo,
  profile
});

export default reducer;
