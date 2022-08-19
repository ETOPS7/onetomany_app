const { SET_WS } = require('../types');

const wsReducer = (state = null, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_WS:
      return payload;

    default:
      return state;
  }
};

export default wsReducer;
