import {
    LOGIN_USER_SUCCESS,
    LOGOUT_USER,
} from '../actions';

const INIT_STATE = localStorage.getItem('token');

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case LOGIN_USER_SUCCESS:
            localStorage.setItem("token", action.payload);
            return { ...state, token: action.payload };
        case LOGOUT_USER:
            localStorage.removeItem("token");
            return {}
        default: return { ...state };
    }
}
