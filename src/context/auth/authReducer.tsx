import { AUTH_ERROR, CLEAR_ERRORS, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, SIGNUP_FAIL, SIGNUP_SUCCESS, USER_LOADED } from "../types"

export default (state: any, action: any) => {
    switch (action.type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload,
            }
        // case LOGIN_SUCCESS:
        //     return {
        //         ...state,
        //         isAuthenticated: true,
        //         user: action.payload
        //     }
        case SIGNUP_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            // localStorage.setItem('token', action.payload)
            console.log('consolo', action.payload)
            return {
                ...state,
                // user: [...action.payload],
                ...action.payload,
                isAuthenticated: true,
                loading: false,
            }
        case SIGNUP_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                // token: null,
                // isAuthenticated: false,
                // loading: false,
                // user: null,
                error: null,
            }
    }
}