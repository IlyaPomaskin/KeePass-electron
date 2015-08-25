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

export const OPEN_ENTRY_MODAL = 'OPEN_ENTRY_MODAL';
export function openEntryModal(uuid) {
	return {
		type: OPEN_ENTRY_MODAL,
		uuid
	}
}

export const CLOSE_ENTRY_MODAL = 'CLOSE_ENTRY_MODAL';
export function closeEntryModal() {
	return {
		type: CLOSE_ENTRY_MODAL
	}
}
