import { FC, useReducer } from "react";
import { v4 as uuid } from 'uuid';
import alertContext from "./alertContext";
import alertReducer from './alertReducer';

import {
    SET_ALERT,
    REMOVE_ALERT,
} from '../types'

export interface Alert {
    id: string;
    msg: string;
    type: string;
}

export interface AlertState {
    setAlert: (msg: string, type: string) => void;
    alerts: Alert[];
}

interface Props {
    children: React.ReactNode;
}

const AlertState: FC<Props> = props => {
    const initialState = {
        alerts: []
    }
    const [state, dispatch] = useReducer(alertReducer, initialState);

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