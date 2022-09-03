import { ADD_PRESENT, DELETE_PRESENT, PRESENTS_FOR_USER } from '../types';

const presentsReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case PRESENTS_FOR_USER:
      return payload;
    case ADD_PRESENT:
      return [...state, payload];
    case DELETE_PRESENT:
      return state.filter((el) => el.id !== payload.id);
    default:
      return state;
  }
};

export default presentsReducer;
