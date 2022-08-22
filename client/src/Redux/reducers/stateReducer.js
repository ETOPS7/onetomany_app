import { CHANGE_STATE } from '../types';

const stateReducer = (state = false, action) => {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_STATE:
      return !state;
    default:
      return state;
  }
};

export default stateReducer;
