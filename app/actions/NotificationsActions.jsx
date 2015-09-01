import { Promise } from 'bluebird';
import * as uuid from 'uuid';

export const CREATE_NOTIFICATION = 'CREATE_NOTIFICATION';
export function createNotification(message, time = 5000) {
    return (dispatch) => {
        const id = uuid.v4();

        return dispatch({
            type: CREATE_NOTIFICATION,
            timeout: setTimeout(() => dispatch(closeNotification(id)), time),
            id,
            message
        });
    };
}

export const CLOSE_NOTIFICATION = 'CLOSE_NOTIFICATION';
export function closeNotification(id) {
    return {
        type: CLOSE_NOTIFICATION,
        id
    }
}
