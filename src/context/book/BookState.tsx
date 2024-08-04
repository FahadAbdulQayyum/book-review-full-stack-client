import { FC, useReducer } from "react";
import bookContext from "./bookContext";
import bookReducer from './bookReducer';

import {
    GET_ALL_BOOKS,
    ADD_BOOK,
    DELETE_BOOK,
    UPDATE_BOOK,
    SET_CURRENT,
    CLEAR_CURRENT,
    FILTER_BOOK,
    CLEAR_FILTER,
    BOOK_ERROR,
    GET_BOOKS,
    CLEAR_BOOKS,
    API,
    REVIEW_LIKE
} from '../types'
import axios from "axios";

// Define the types for the context value
export interface Book {
    _id: string;
    title: string;
    author: string;
    publicationYear: string;
    genre: string;
    bookReviewText: string;
    rating: number;
}

export interface BookState {
    allBooks: Book[];
    books: Book[];
    current: Book | null;
    error: null;
    loading: null;
    getAllBooks: () => void;
    getBooks: () => void;
    addBook: (book: Book) => void;
    reviewLike: (id: string) => void;
    deleteBook: (id: string) => void;
    clearBooks: () => void;
    setCurrent: (book: Book) => void;
    clearCurrent: () => void;
    updateBook: (book: Book) => void;
    filterBook: (text: string) => void;
    filtered: Book[];
    clearFilter: () => void;
    setAlert: (msg: string, type: string) => void;
    removeAlert: () => void;
}

interface Props {
    children: React.ReactNode;
}

const BookState: FC<Props> = props => {
    const initialState = {
        allBooks: [],
        books: [],
        current: null,
        filtered: null,
        error: null,

        loading: null,
    }
    const [state, dispatch] = useReducer(bookReducer, initialState);

    // Define functions to dispatch actions
    const getBooks = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.get(`${API}/api/books`, config)
            dispatch({ type: GET_BOOKS, payload: res.data });
        } catch (err: any) {
            dispatch({ type: BOOK_ERROR, payload: (err.response.data.msg || err.response.msg) })
        }
    }

    const getAllBooks = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.get(`${API}/api/books/all`, config)
            dispatch({ type: GET_ALL_BOOKS, payload: res.data })
        } catch (err: any) {
            console.log(err)
            dispatch({ type: BOOK_ERROR, payload: (err.response.data.msg || err.response.msg) })
        }
    }

    // Define functions to dispatch actions
    const addBook = async (book: Book) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post(`${API}/api/books`, book, config)
            dispatch({ type: ADD_BOOK, payload: res.data });
        } catch (err: any) {
            dispatch({ type: BOOK_ERROR, payload: (err.response.data.msg || err.response.msg) })
        }
    }

    const reviewLike = async (id: string) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const data = { review: true }
            const res = await axios.post(`${API}/api/books/review/${id}`, data, config)
            dispatch({ type: REVIEW_LIKE, payload: id });
        } catch (err: any) {
            dispatch({ type: BOOK_ERROR, payload: (err.response.data.msg || err.response.msg) })
        }
    }

    const deleteBook = async (id: string) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            await axios.delete(`${API}/api/books/${id}`, config)
            dispatch({ type: DELETE_BOOK, payload: id })
        } catch (err) {
            console.log(err)
        }
    }

    const updateBook = async (book: Book) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put(`${API}/api/books/${book._id}`, book, config)
        dispatch({ type: UPDATE_BOOK, payload: res.data });
    }
    const setCurrent = (book: Book) => dispatch({ type: SET_CURRENT, payload: book });
    const clearCurrent = () => dispatch({ type: CLEAR_CURRENT });
    const filterBook = (text: string) => dispatch({ type: FILTER_BOOK, payload: text });
    const clearBooks = () => dispatch({ type: CLEAR_BOOKS })
    const clearFilter = () => dispatch({ type: CLEAR_FILTER });


    return (
        <bookContext.Provider value={{
            allBooks: state.allBooks,
            books: state.books,
            current: state.current,
            filtered: state.filtered,
            error: state.error,
            loading: state.loading,
            getAllBooks,
            getBooks,
            reviewLike,
            addBook,
            deleteBook,
            clearBooks,
            setCurrent,
            clearCurrent,
            updateBook,
            filterBook,
            clearFilter,
        }}>
            {props.children}
        </bookContext.Provider >
    )

}

export default BookState;