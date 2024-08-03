import { FC, useReducer } from "react";
import bookContext from "./bookContext";
import bookReducer from './bookReducer';

import {
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
    API
} from '../types'
import axios from "axios";

// Define the types for the context value
export interface Book {
    // id?: string;
    // id: string;
    _id: string;
    // id?: string | undefined;
    // id: number;
    title: string;
    author: string;
    // publicationYear: number;
    publicationYear: string;
    genre: string;
    bookReviewText: string;
    rating: number;
}

export interface BookState {
    books: Book[];
    // current: Book[];
    current: Book | null;
    error: null;
    loading: null;
    getBooks: () => void;
    addBook: (book: Book) => void;
    deleteBook: (id: string) => void;
    clearBooks: () => void;
    setCurrent: (book: Book) => void;
    clearCurrent: () => void;
    updateBook: (book: Book) => void;
    filterBook: (text: string) => void;
    // filtered: string[] | null;
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
        books: [
            // {
            //     // id: 0,
            //     id: '0',
            //     title: 'Flying Kites0',
            //     author: 'Khalid Hossein0',
            //     publicationYear: '2021',
            //     genre: 'RealLife',
            //     bookReviewText: 'By the way it teaches you the emotions!',
            //     rating: 4
            // },
            // {
            //     // id: 1,
            //     id: '1',
            //     title: 'Flying Kites',
            //     author: 'Khalid Hossein',
            //     publicationYear: '2021',
            //     genre: 'Fictional',
            //     bookReviewText: 'Great Book!',
            //     rating: 2
            // },
            // {
            //     // id: 2,
            //     id: '2',
            //     title: 'Flying Kites1',
            //     author: 'Khalid Hossein1',
            //     publicationYear: '2022',
            //     genre: 'Fictional',
            //     bookReviewText: 'Great Book!1',
            //     rating: 3
            // }
        ],
        current: null,
        filtered: null,
        error: null,

        loading: null,

    }
    const [state, dispatch] = useReducer(bookReducer, initialState);

    // Define functions to dispatch actions
    const getBooks = async () => {
        // book.id = uuid();
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            // const res = await axios.get('api/books', config)
            const res = await axios.get(`${API}/api/books`, config)
            dispatch({ type: GET_BOOKS, payload: res.data });
        } catch (err: any) {
            // dispatch({ type: BOOK_ERROR, payload: err.response.msg })
            dispatch({ type: BOOK_ERROR, payload: (err.response.data.msg || err.response.msg) })
        }
    }

    // Define functions to dispatch actions
    const addBook = async (book: Book) => {
        // book.id = uuid();
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            // const res = await axios.post('api/books', book, config)
            const res = await axios.post(`${API}/api/books`, book, config)
            console.log('ressss..addbook', res)
            dispatch({ type: ADD_BOOK, payload: res.data });
        } catch (err: any) {
            // dispatch({ type: BOOK_ERROR, payload: err.response.msg })
            dispatch({ type: BOOK_ERROR, payload: (err.response.data.msg || err.response.msg) })
        }
    }

    // const deleteBook = (id: string) => {
    const deleteBook = async (id: string) => {
        // const deleteBook = (id: string | undefined) => {
        // dispatch({ type: DELETE_BOOK, payload: id });
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            // await axios.delete(`api/contacts/${id}`, config)
            await axios.delete(`${API}/api/books/${id}`, config)
            dispatch({ type: DELETE_BOOK, payload: id })
        } catch (err) {
            console.log(err)
        }
    }

    // const updateBook = (book: Book) => dispatch({ type: UPDATE_BOOK, payload: book });
    // const updateBook = (book: Book) => {
    const updateBook = async (book: Book) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        // const res = await axios.put(`api/contacts/${book._id}`, config)
        const res = await axios.put(`${API}/api/books/${book._id}`, book, config)
        // const res = await axios.put(`api / contacts / ${ book.id }`, config)
        console.log('erssupdaed', res)
        dispatch({ type: UPDATE_BOOK, payload: res.data });
    }
    const setCurrent = (book: Book) => dispatch({ type: SET_CURRENT, payload: book });
    const clearCurrent = () => dispatch({ type: CLEAR_CURRENT });
    const filterBook = (text: string) => dispatch({ type: FILTER_BOOK, payload: text });
    const clearBooks = () => dispatch({ type: CLEAR_BOOKS })
    const clearFilter = () => dispatch({ type: CLEAR_FILTER });
    // const setAlert = (msg: string, type: string) => dispatch({ type: SET_ALERT, payload: { msg, type } });
    // const removeAlert = () => dispatch({ type: REMOVE_ALERT });


    // Add a book

    // Delete a book

    // Set Current Book

    // Clear Current Book

    // Update Book

    // Filter Book

    // Clear Filter

    return (
        <bookContext.Provider value={{
            books: state.books,
            current: state.current,
            filtered: state.filtered,
            error: state.error,
            loading: state.loading,
            getBooks,
            addBook,
            deleteBook,
            clearBooks,
            setCurrent,
            clearCurrent,
            updateBook,
            filterBook,
            clearFilter,
            // setAlert,
            // removeAlert,

            // addBook: (book: any) => dispatch({ type: ADD_BOOK, payload: book }),
            // deleteBook: (id: number) => dispatch({ type: DELETE_BOOK, payload: id }),
            // setCurrent: (book: any) => dispatch({ type: SET_CURRENT, payload: book }),
            // clearCurrent: () => dispatch({ type: CLEAR_CURRENT }),
            // updateBook: (book: any) => dispatch({ type: UPDATE_BOOK, payload: book }),
            // filterBook: (text: string) => dispatch({ type: FILTER_BOOK, payload: text }),
            // setAlert: (msg: string, type: string) => dispatch({ type: SET_ALERT, payload: { msg, type } }),
            // removeAlert: () => dispatch({ type: REMOVE_ALERT })
        }}>
            {props.children}
        </bookContext.Provider >
    )

}

export default BookState;