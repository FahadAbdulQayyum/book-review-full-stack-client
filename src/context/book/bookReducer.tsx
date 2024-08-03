import {
    GET_BOOKS,
    CLEAR_FILTER,
    ADD_BOOK,
    DELETE_BOOK,
    UPDATE_BOOK,
    SET_CURRENT,
    CLEAR_CURRENT,
    FILTER_BOOK,
    CLEAR_BOOKS,
    BOOK_ERROR,
} from '../types';
import { Book } from './BookState';

export default (state: any, action: any) => {
    switch (action.type) {
        case GET_BOOKS:
            return {
                ...state,
                books: action.payload,
                loading: false
            }
        case ADD_BOOK:
            return {
                ...state,
                books: [...state.books, action.payload]
            }
        case UPDATE_BOOK:
            return {
                ...state,
                books: state.books.map((book: any) => book._id === action.payload._id ? action.payload : book)
                // books: state.books.map((book: any) => +book.id === +action.payload.id ? action.payload : book)
            }
        case DELETE_BOOK:
            console.log('onDeletedddd!!!!')
            return {
                ...state,
                // books: state.books.filter((book: Book) => book.id !== action.payload),
                books: state.books.filter((book: Book) => book._id !== action.payload),
                // books: state.books.filter((book: any) => book.id !== action.payload),
            }
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            }
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            }
        case FILTER_BOOK:
            return {
                ...state,
                filtered: state.books.filter((book: Book) => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    console.log('updaebook...', book)
                    // return book.name.match(regex) || book.author.match(regex) || book.genre.match(regex) || book.publicationYear.match(regex);
                    return book.title.match(regex) || book.author.match(regex) || book.genre.match(regex) || book.publicationYear.toString().match(regex);
                })
            }
        case CLEAR_BOOKS:
            return {
                ...state,
                books: null,
                filtered: null,
                error: null,
                current: null
            }
        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null
            }
        case BOOK_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case BOOK_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}
