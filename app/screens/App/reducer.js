import {
  STATUS_CHANGE,
  SET_PROVIDERS,
} from './constants';

const initialState = {
  loading: false,
  isNetwork: 'none',
  providers: [],
  rand: 0,
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case STATUS_CHANGE: {
      // return { isNetwork: action.payload };
      return { ...state, isNetwork: action.payload };
    }
    case SET_PROVIDERS: {
        console.log('REDUCER SET_PROVIDERS');
        console.log(action.payload);
        // return { providers: action.payload };
        return { ...state, providers: action.payload, rand: Math.floor(Math.random() * Math.floor(10000)) };
    }
    

    default:
      return state;
  }
}

export default appReducer;
