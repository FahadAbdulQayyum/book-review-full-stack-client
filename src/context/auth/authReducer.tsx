import { AUTH_ERROR, CLEAR_ERRORS, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, SIGNUP_FAIL, SIGNUP_SUCCESS, UPDATE_REVIEW, USER_LOADED } from "../types"

export default (state: any, action: any) => {
    switch (action.type) {
        case USER_LOADED:
            console.log('user.....,,,,', action.payload)
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload,
                reviews: action.payload.reviews
                // ...action.payload.reviews.map((v: any) => console.log('...,,,,', v.bookId)),
                // ...action.payload.reviews.map((v: any) => [state.reviews].push(v.bookId)),
                // c: console.log('...,,,,', state.reviews)
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
        case UPDATE_REVIEW:
            return {
                ...state,
                // reviews: state.reviews.map((review: any) => review.bookId === action.payload ? console.log('review.like...', review.like) : console.log('didn\'t match'))

                // ...state.reviews.map((review: any) => {
                //     if (review.bookId === action.payload) {
                //         console.log('11111....')
                //         review.like = !review.like;
                //     }
                //     console.log('2222....', review)
                //     return review;
                // })

                // reviews: [...state.reviews.map((review: any) => review.bookId === action.payload ? review.like = !review.like : "")]
                // ...state.reviews.map((review: any) => review.bookId === action.payload ? console.log('review.like...', review.like) : console.log('\'\''))
                // ...state.reviews.map((review: any) => review.bookId === action.payload ? review.like = !review.like : review)

                // ...state.reviews.map((review: any) => {
                reviews: state.reviews.map((review: any) => {
                    if (review.bookId === action.payload) {
                        return { ...review, like: !review.like }; // Toggle the like status immutably
                    }
                    return review; // Return the unchanged review
                })
            }
    }
}