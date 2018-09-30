import {
  STATUS_CHANGE,
} from './constants';

const initialState = {
  loading: false,
  isNetwork: 'none',
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case STATUS_CHANGE: {
      return { isNetwork: action.payload };
    }
    default:
      return state;
  }
}

export default appReducer;
