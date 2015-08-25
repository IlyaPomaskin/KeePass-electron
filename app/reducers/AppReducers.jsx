import * as AppActions from '../actions/AppActions';
import { Map } from 'immutable';
import * as clipboard from 'clipboard';

const initialAppState = Map({
	selectedGroup: null,
	isEntryModalShown: false
});

export default function app(state = initialAppState, action) {
	switch (action.type) {
		case AppActions.CLOSE_ENTRY_MODAL:
			return state
				.merge({
					'isEntryModalShown': false,
					'selectedEntry': null
				})
		case AppActions.OPEN_ENTRY_MODAL:
			return state
				.merge({
					'isEntryModalShown': true,
					'selectedEntry': action.uuid
				})
		case AppActions.COPY_TO_CLIPBOARD:
			clipboard.writeText(action.text);
			return state;
		case AppActions.SELECT_GROUP:
			return state.set('selectedGroup', action.uuid);
		default:
			return state;
	}
}
