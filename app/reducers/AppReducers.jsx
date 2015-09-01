import * as AppActions from '../actions/AppActions';
import IM, { Map, Stack, Record } from 'immutable';
import * as clipboard from 'clipboard';

const initialAppState = IM.fromJS({
    selectedGroup: null,
    modals: {
        [AppActions.MODAL_TYPE_ENTRY]: {
            uuid: null
        }
    },
    modalsStack: Stack()
});

export default function app(state = initialAppState, action = {}) {
    switch (action.type) {
        case AppActions.CLOSE_MODAL:
            return state.update('modalsStack', stack => stack.shift());
        case AppActions.OPEN_MODAL:
            return state
                .update('modalsStack', stack => stack.unshift(action.modalType))
                .mergeIn(['modals', action.modalType], { ...action });
        case AppActions.COPY_TO_CLIPBOARD:
            clipboard.writeText(action.text);
            return state;
        case AppActions.SELECT_GROUP:
            return state.set('selectedGroup', action.uuid);
        default:
            return state;
    }
}
