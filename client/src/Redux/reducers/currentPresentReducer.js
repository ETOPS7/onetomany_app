import { ADD_PRESENT } from '../types';

const currentPresentReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_PRESENT:
      return { ...state, payload };
    default:
      return state;
  }
};

export default currentPresentReducer;
