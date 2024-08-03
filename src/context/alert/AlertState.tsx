import { FC, useReducer } from "react";
import { v4 as uuid } from 'uuid';
import alertContext from "./alertContext";
import alertReducer from './alertReducer';

import {
    SET_ALERT,
    REMOVE_ALERT,
} from '../types'

// Define the types for the context value
export interface Alert {
    // id?: string;
    id: string;
    msg: string;
    type: string;
}

export interface AlertState {
    // books: Book[];
    // // current: Book[];
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
    setAlert: (msg: string, type: string) => void;
    // removeAlert: (id: string) => void;
    alerts: Alert[];
}

interface Props {
    children: React.ReactNode;
}

const AlertState: FC<Props> = props => {
    // const initialState: any = []
    const initialState = {
        alerts: []
    }
    const [state, dispatch] = useReducer(alertReducer, initialState);

    // load User
    // Register User
    // Login User
    // Logout User
    // Clear Errors

    // const setAlert = (msg: string, type: string) => dispatch({ type: SET_ALERT, payload: { msg, type } });
    // const removeAlert = () => dispatch({ type: REMOVE_ALERT });

    // Set the alert
    const setAlert = (msg: string, type: string, timeout: number = 2000) => {
        const id = uuid();
        dispatch({ type: SET_ALERT, payload: { id, msg, type } })

        setTimeout(() => {
            dispatch({ type: REMOVE_ALERT, payload: id })
        }, timeout);
    }

    return (
        <alertContext.Provider value={{
            alerts: state.alerts,
            setAlert,
        }}>
            {props.children}
        </alertContext.Provider >
    )

}

export default AlertState;