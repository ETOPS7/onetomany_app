import { ADD_TYPE } from '../types';

const typeReducer = (state = '', action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_TYPE:
      return payload;
    default:
      return state;
  }
};

export default typeReducer;
