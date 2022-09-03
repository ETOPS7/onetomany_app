import { SET_COUNTER } from '../types';

const userCounterReducer = (state = 0, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_COUNTER:
      return payload;

    default:
      return state;
  }
};

export default userCounterReducer;
