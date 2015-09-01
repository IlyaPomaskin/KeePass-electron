import * as FileActions from '../actions/FileActions';
import * as DbActions from '../actions/DbActions';
import IM, { List } from 'immutable';
import { getPathForUUID, getPathForFieldValue } from '../utils/Entry';
import { KeePassReviver } from '../utils/KeePass';

// TODO full keepass structure
const initialKeePass = IM.fromJS({
    KeePassFile: {
        Meta: {},
        Root: {}
    }
}, KeePassReviver);

export default function db(state = initialKeePass, action = {}) {
    switch (action.type) {
        case FileActions.OPEN_FILE_SUCCESS:
            return IM.fromJS(action.db.getRawApi().get(), KeePassReviver);
        case DbActions.TOGGLE_GROUP_EXPAND:
            return state.updateIn(
                getPathForUUID(state, action.uuid).push('isExpanded'),
                'False',
                isExpanded => isExpanded === 'True' ? 'False' : 'True'
            );
        case DbActions.SAVE_ENTRY:
            return state.setIn(
                getPathForUUID(state, action.entry.get('UUID')),
                action.entry
            );
        case DbActions.CREATE_ENTRY:
            return state.updateIn(
                getPathForUUID(state, action.uuid).push('Entry'),
                List(),
                entries => entries.push(action.entry)
            );
        case DbActions.REMOVE_ENTRY:
            return state.removeIn(getPathForUUID(state, action.uuid));
        case DbActions.CREATE_GROUP:
            return state.updateIn(
                getPathForUUID(state, action.uuid),
                List(),
                (group) => group
                    .set('isExpanded', 'True')
                    .update('Group', List(), groups => groups.push(
                        createGroup().set('Name', action.title)
                    ))
            );
        default:
            return state;
    }
}
