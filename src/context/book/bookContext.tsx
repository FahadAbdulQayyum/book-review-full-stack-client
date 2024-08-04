import { createContext } from "react";
import { Book, BookState } from "./BookState";


interface BookContextType {
    allBooks: Book[],
    books: Book[],
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
}


const defaultContextValue: BookState = {
    allBooks: [],
    books: [],
    current: null,
    error: null,
    loading: null,
    getAllBooks: () => { },
    getBooks: () => { },
    addBook: () => { },
    reviewLike: () => { },
    deleteBook: () => { },
    clearBooks: () => { },
    setCurrent: () => { },
    clearCurrent: () => { },
    updateBook: () => { },
    filterBook: () => { },
    filtered: [],
    clearFilter: () => { },
    setAlert: () => { },
    removeAlert: () => { }
};

const bookContext = createContext<BookContextType>(defaultContextValue);

export default bookContext;