import { createContext } from "react";
import { AuthState, formProps } from "./AuthState";

interface AuthContextType {
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
    signup: (formData: formProps) => void;
    login: (formData: formProps) => void;
    logout: () => void;
    clearErrors: () => void;
    loadUser: () => void,
    token: string;
    isAuthenticated: boolean,
    loading: boolean,
    // user: formProps[],
    user: formProps | null,
    error: string,
}



// Create context with a default value
const defaultContextValue: AuthState = {
    token: '',
    isAuthenticated: false,
    loading: false,
    // user: [],
    user: null,
    error: '',
    loadUser: () => { },
    // signup: (formData: formProps) => { },
    // login: (formData: formProps) => { },
    signup: () => { },
    login: () => { },
    logout: () => { },
    clearErrors: () => { },
};

const authContext = createContext<AuthContextType>(defaultContextValue);

export default authContext;