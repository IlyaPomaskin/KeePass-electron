import { closeEntryModal, openEntryModal } from './AppActions';

export const TOGGLE_GROUP_EXPAND = 'TOGGLE_GROUP_EXPAND';
export function toggleGroupExpand(uuid) {
    return {
        type: TOGGLE_GROUP_EXPAND,
        uuid
    }
}

export const CREATE_GROUP = 'CREATE_GROUP';
export function createGroup(title) {
    return (dispatch, getStore) => {
        return dispatch({
            type: CREATE_GROUP,
            uuid: getStore().app.get('selectedGroup'),
            title
        })
    }
}

export const REMOVE_ENTRY = 'REMOVE_ENTRY';
export function removeEntry(uuid) {
    return {
        type: REMOVE_ENTRY,
        uuid
    }
}

export const CREATE_ENTRY = 'CREATE_ENTRY';
export const SAVE_ENTRY = 'SAVE_ENTRY';
export function saveEntry(entry, isNew) {
    if (isNew) {
        return (dispatch, getStore) => {
            dispatch({
                type: CREATE_ENTRY,
                uuid: getStore().app.get('selectedGroup'),
                entry
            });

            dispatch(closeEntryModal());

            return dispatch(openEntryModal(entry.get('UUID')));
        }
    } else {
        return {
            type: SAVE_ENTRY,
            entry
        }
    }
}
