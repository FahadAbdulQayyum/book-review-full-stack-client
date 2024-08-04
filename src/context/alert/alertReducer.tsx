import { SET_ALERT, REMOVE_ALERT } from "../types";

export default (state: any, action: any) => {
    switch (action.type) {
        case SET_ALERT:
            console.log('setAlertttt')
            return {
                ...state,
                alerts: [state, action.payload]
            }

        case REMOVE_ALERT:
            return state.alerts.filter((alert: any) => alert.id !== action.payload)
        default:
            return state;
    }
}