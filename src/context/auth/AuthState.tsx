import { FC, useContext, useReducer } from "react";
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
    UPDATE_REVIEW
} from '../types'
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import AlertContext from "../../context/alert/alertContext";

export interface formProps {
    name?: string,
    email: string,
    password: string,
    cpassword?: string,
    reviews?: {
        bookId: string,
        like: boolean,
        _id: boolean,
    } | null
}


export interface AuthState {
    signup: (formData: formProps) => void,
    clearErrors: () => void,
    loadUser: () => void,
    login: (formData: formProps) => void,
    logout: () => void,
    reviewUpdate: () => void,
    token: string,
    isAuthenticated: boolean,
    loading: boolean,
    user: formProps | null,
    error: string,
    reviews: {
        bookId: string,
        like: boolean,
        _id: boolean,
    }[] | null
}

interface Props {
    children: React.ReactNode;
}

const AuthState: FC<Props> = props => {
    const initialState = {
        token: localStorage.getItem('token') || null,
        isAuthenticated: false,
        loading: null,
        user: null,
        error: null,
    }
    const [state, dispatch] = useReducer(authReducer, initialState);
    const { setAlert } = useContext(AlertContext)

    // load User
    const loadUser = async () => {
        if (localStorage.token) {
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
            const res = await axios.post(`${API}/api/users`, formData, config)
            dispatch({ type: SIGNUP_SUCCESS, payload: res?.data });
            loadUser()
        } catch (err: any) {
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
            const res = await axios.post(`${API}/api/auth`, formData, config)
            console.log('res.data....', res.data)
            if (res.data.token && res.data.token.length > 0) {
                dispatch({ type: LOGIN_SUCCESS, payload: res.data })
                setAlert('Logged in successfully!', 'success')
            } else if (res.data.msg) {
                setAlert(res.data.msg, res.data.success ? 'success' : 'danger')
                if (!res.data.success) {
                    dispatch({ type: LOGIN_FAIL, payload: res.data })
                }
            }
            loadUser()
        } catch (err) {
            dispatch({ type: LOGIN_FAIL })
            setAlert('Login Failed!', 'danger')
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

    // Update Reviews
    const reviewUpdate = (id: string) => {
        try {
            dispatch({
                type: UPDATE_REVIEW, payload: id
            })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <authContext.Provider value={{
            token: state?.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            error: state.error,
            reviews: state.reviews,
            reviewUpdate,
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