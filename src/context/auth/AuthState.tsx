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
    UPDATE_REVIEW,
    REVIEWS_LOADED
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
    loadReviews: () => void,
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
    }[] | null,
    reviewsToShow: {
        bookId: string,
        totalLikes: number,
        totalDislikes: number,
    }[] | null,
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
        reviewsToShow: null
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

    // load Reviews
    const loadReviews = async () => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }

        try {
            const res = await axios.get(`${API}/api/books/fetchReviewsData`)
            dispatch({ type: REVIEWS_LOADED, payload: res.data.data })
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
            setAlert('Signed up successfully!', 'success')
            loadUser()
        } catch (err: any) {
            dispatch({
                type: SIGNUP_FAIL, payload: (err.config.message || err.response.data.msg || err.response.data)
            });
            setAlert('Signed up Failed!', 'danger')
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
            if (res.data.token && res.data.token.length > 0) {
                setAlert('Logged in successfully!', 'success')
                loadUser()
                return dispatch({ type: LOGIN_SUCCESS, payload: res.data })
            } else if (res.data.success) {
                setAlert(res.data.msg, res.data.success ? 'success' : 'danger')
                loadUser()
                return dispatch({ type: LOGIN_SUCCESS, payload: res.data })
            } else if (!res.data.success) {
                setAlert(res.data.msg, res.data.success ? 'success' : 'danger')
                return dispatch({ type: LOGIN_FAIL })
            } else {
                return dispatch({ type: LOGIN_FAIL })
            }

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
            reviewsToShow: state.reviewsToShow,
            reviewUpdate,
            signup,
            login,
            logout,
            clearErrors,
            loadUser,
            loadReviews
        }}>
            {props.children}
        </authContext.Provider >
    )

}

export default AuthState;