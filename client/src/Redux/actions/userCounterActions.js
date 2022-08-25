import { GET_COUNTER, SET_COUNTER } from '../types';

export const getUserCounter = () => ({
  type: GET_COUNTER,
});

export const setUserCounter = (payload) => ({
  type: SET_COUNTER,
  payload
});
