import {
  ERROR_SET,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  SIGNUP_FAILURE,
  RESET_FAILURE,
} from './constants';


const INITIAL_STATE = {
  firebaseLoaded: false,
  email: '',
  emailReset: '',
  password: '',
  phone: '',
  firstname: '',
  lastname: '',
  user: null,
  error: '',
  fontLoaded: false,
  loginStatus: 'initial',
  loadWelcome: false
};

const RESET_STATE = {
  email: '',
  emailReset: '',
  password: '',
  phone: '',
  firstname: '',
  lastname: '',
  error: ''
};

function appReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ERROR_SET: {
      return { ...state, error: action.payload };
    }
    case LOGOUT_SUCCESS: {
      return { loginStatus: 'initial', ...RESET_STATE };
    }
    case LOGIN_SUCCESS: {
      return { ...state, firebaseLoaded: true, email: action.payload.user.email, user: action.payload.user, loginStatus: 'logged', email: '', password: ''};
    }
    case RESET_FAILURE:
    case SIGNUP_FAILURE:
    case LOGIN_FAILURE: {
      return { ...state, error: action.payload, password: '', loginStatus: 'loginfailed'  };
    }
    default:
      return state;
  }
}

export default appReducer;
