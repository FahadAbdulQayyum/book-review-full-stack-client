import { FC, useReducer } from "react";
import authContext from "./authContext";
import authReducer from './authReducer';

import {
    SIGNUP_SUCCESS,
    API,
    SIGNUP_FAIL,
    CLEAR_ERRORS,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
} from '../types'
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

// Define the types for the context value
export interface formProps {
    // name: string,
    name?: string,
    email: string,
    password: string,
    cpassword?: string
}


export interface AuthState {
    signup: (formData: formProps) => void,
    clearErrors: () => void,
    loadUser: () => void,
    login: (formData: formProps) => void,
    logout: () => void,
    token: string,
    isAuthenticated: boolean,
    loading: boolean,
    // user: formProps[],
    user: formProps | null,
    error: string,
}

interface Props {
    children: React.ReactNode;
}

const AuthState: FC<Props> = props => {
    const initialState = {
        token: localStorage.getItem('token') || null,
        // isAuthenticated: null,
        isAuthenticated: true,
        // isAuthenticated: false,
        // loading: false,
        // loading: true,
        loading: null,
        user: null,
        error: null,
    }
    const [state, dispatch] = useReducer(authReducer, initialState);

    // load User
    const loadUser = async () => {
        // console.log('localStorage.token....', localStorage.token)
        if (localStorage.token) {
            // if (localStorage.getItem('token')) {
            // console.log('localStorage.token...11', localStorage.token);
            // console.log("localStorage.getItem('token')", JSON.stringify(localStorage.getItem('token')));
            // setAuthToken(localStorage.getItem('token'));
            setAuthToken(localStorage.token);
        }

        try {
            const res = await axios.get(`${API}/api/auth`)
            dispatch({ type: USER_LOADED, payload: res.data })
        } catch (err) {
            dispatch({ type: AUTH_ERROR })
        }
    }
    // Register User
    const signup = async (formData: formProps) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',

            }
        }
        try {
            // const res = await axios.post(`${API}/api/auth/signup`, formData, config)
            const res = await axios.post(`${API}/api/users`, formData, config)
            // const res = await axios.post('/api/users', formData, config)
            // const res = await axios.post('/api/auth', formData, config)
            console.log('ressss', res?.data)
            dispatch({ type: SIGNUP_SUCCESS, payload: res?.data });
            loadUser()
        } catch (err: any) {
            console.log('errrrrrrr....', err)
            dispatch({
                type: SIGNUP_FAIL, payload: (err.config.message || err.response.data.msg || err.response.data)
            });
        }
    }
    // Login User
    const login = async (formData: formProps) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        try {

            // const res = await axios.post(`${ API } / api / auth`, formData, config)
            // const res = await axios.post('/api/auth/user/login', formData, config)
            const res = await axios.post(`${API}/api/auth`, formData, config)
            dispatch({ type: LOGIN_SUCCESS, payload: res.data })
            loadUser()
        } catch (err) {
            dispatch({ type: LOGIN_FAIL })
        }
    }
    // Logout User
    const logout = () => {
        dispatch({
            type: LOGOUT
        })
    }

    // Clear Errors
    const clearErrors = () => {
        dispatch({ type: CLEAR_ERRORS });
    }

    return (
        <authContext.Provider value={{
            token: state?.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            error: state.error,
            signup,
            login,
            logout,
            clearErrors,
            loadUser
        }}>
            {props.children}
        </authContext.Provider >
    )

}

export default AuthState;