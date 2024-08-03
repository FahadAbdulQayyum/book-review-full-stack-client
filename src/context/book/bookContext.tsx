import { createContext } from "react";
import { Book, BookState } from "./BookState";

// // Define the type for your context value
// interface BookContextType {
//     title?: string;
//     author?: string;
// }


interface BookContextType {
    books: Book[],
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
}

// interface BookContextType {
//     books: Book[];
//     addBook: (book: Book) => void;
//     deleteBook: (id: number) => void;
//     setCurrent: (book: Book) => void;
//     clearCurrent: () => void;
//     updateBook: (book: Book) => void;
//     filterBook: (text: string) => void;
//     setAlert: (msg: string, type: string) => void;
//     removeAlert: () => void;
// }

// Create context with a default value
const defaultContextValue: BookState = {
    books: [],
    // current: [],
    // current: '',
    current: null,
    error: null,
    loading: null,
    getBooks: () => { },
    addBook: () => { },
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

// const bookContext = createContext<BookState>(defaultContextValue);
const bookContext = createContext<BookContextType>(defaultContextValue);

export default bookContext;