import { AUTH_ERROR, CLEAR_ERRORS, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, REVIEWS_LOADED, SIGNUP_FAIL, SIGNUP_SUCCESS, UPDATE_REVIEW, USER_LOADED } from "../types"

export default (state: any, action: any) => {
    switch (action.type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload,
                reviews: action.payload.reviews
            }

        case SIGNUP_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
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
                error: null,
            }
        case UPDATE_REVIEW:
            return {
                ...state,
                reviews: state.reviews.map((review: any) => {
                    if (review.bookId === action.payload) {
                        return { ...review, like: !review.like }
                    }
                    return review
                })
            }
        case REVIEWS_LOADED:
            return {
                ...state,
                reviewsToShow: action.payload
            }
        default:
            return state;
    }
}