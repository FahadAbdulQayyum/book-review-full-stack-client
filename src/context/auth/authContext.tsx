import { createContext } from "react";
import { AuthState, formProps } from "./AuthState";

interface AuthContextType {
    signup: (formData: formProps) => void;
    login: (formData: formProps) => void;
    logout: () => void;
    clearErrors: () => void;
    loadUser: () => void,
    token: string;
    isAuthenticated: boolean,
    loading: boolean,
    user: formProps | null,
    error: string,
    reviews: {
        bookId: string,
        like: boolean,
        _id: boolean,
    }[] | null;
    reviewUpdate: (id: string) => void;
}



const defaultContextValue: AuthState = {
    token: '',
    isAuthenticated: false,
    loading: false,
    user: null,
    error: '',
    reviews: null,
    loadUser: () => { },
    signup: () => { },
    login: () => { },
    logout: () => { },
    clearErrors: () => { },
    reviewUpdate: () => { }
};

const authContext = createContext<AuthContextType>(defaultContextValue);

export default authContext;