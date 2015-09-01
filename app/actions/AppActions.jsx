export const SELECT_GROUP = 'SELECT_GROUP';
export function selectGroup(uuid) {
    return {
        type: SELECT_GROUP,
        uuid
    }
}

export const COPY_TO_CLIPBOARD = 'COPY_TO_CLIPBOARD';
export function copyToClipboard(text) {
    return {
        type: COPY_TO_CLIPBOARD,
        text
    }
}

export const MODAL_TYPE_ENTRY = 'MODAL_TYPE_ENTRY';
export const MODAL_TYPE_GROUP = 'MODAL_TYPE_GROUP';

export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export function openEntryModal(uuid) {
    return {
        type: OPEN_MODAL,
        modalType: MODAL_TYPE_ENTRY,
        uuid
    }
}

export function closeEntryModal() {
    return {
        type: CLOSE_MODAL,
        modalType: MODAL_TYPE_ENTRY
    }
}
