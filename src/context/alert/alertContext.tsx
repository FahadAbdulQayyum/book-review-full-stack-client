import { createContext } from "react";
import { Alert, AlertState } from "./AlertState";

interface AlertContextType {
    alerts: Alert[],
    setAlert: (msg: string, type: string) => void;
}



const defaultContextValue: AlertState = {
    alerts: [],
    setAlert: () => { },
};

const alertContext = createContext<AlertContextType>(defaultContextValue);

export default alertContext;