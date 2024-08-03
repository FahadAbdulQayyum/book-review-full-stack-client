import { createContext } from "react";
import { Alert, AlertState } from "./AlertState";

interface AlertContextType {
    alerts: Alert[],
    setAlert: (msg: string, type: string) => void;
    // removeAlert: (id: string) => void;
    // books: Book[],
    // current: Book | null;
    // addBook: (book: Book) => void;
    // deleteBook: (id: string) => void;
    // setCurrent: (book: Book) => void;
    // clearCurrent: () => void;
    // updateBook: (book: Book) => void;
    // filterBook: (text: string) => void;
    // // filtered: string[] | null;
    // filtered: Book[];
    // clearFilter: () => void;
}



// Create context with a default value
const defaultContextValue: AlertState = {
    alerts: [],
    setAlert: () => { },
    // removeAlert: () => { },
};

const alertContext = createContext<AlertContextType>(defaultContextValue);

export default alertContext;