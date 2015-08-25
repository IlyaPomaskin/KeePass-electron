import * as NotificationsActions from '../actions/NotificationsActions';
import { List, Record } from 'immutable';

const initialNotificationsState = List();

const Notification = Record({
    timeout: null,
    id: null,
    message: 'Empty :('
})

export default function app(state = initialNotificationsState, action) {
	switch (action.type) {
		case NotificationsActions.CREATE_NOTIFICATION:
			return state.push(new Notification({
                timeout: action.timeout,
                id: action.id,
                message: action.message
            }));
		case NotificationsActions.CLOSE_NOTIFICATION:
            const notificationIndex = state.findIndex(notification => notification.get('id') === action.id);
            if (notificationIndex !== -1) {
                clearTimeout(state.getIn([notificationIndex, 'timeout']));
                return state.remove(notificationIndex);
            } else {
                return state;
            }
		default:
			return state;
	}
}
