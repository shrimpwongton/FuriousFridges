const DEFAULT_STATE = {   
  currentLocation: {}   
};

const profileReducers = (state = DEFAULT_STATE, action) => {
  if (action.type === 'SET_CURRENT_LOCATION') {
    return Object.assign({}, state, { currentLocation: action.payload });
  } 
  return state;
};

export default profileReducers;
