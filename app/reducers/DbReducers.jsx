import * as FileActions from '../actions/FileActions';
import * as DbActions from '../actions/DbActions';
import IM, { List } from 'immutable';
import { getPathForUUID, getPathForFieldValue } from '../utils/Entry';
import { KeePassReviver } from '../utils/KeePass';
import * as base64 from 'base64-js';
import * as uuid from 'uuid';
//FIXME
var moment = require('moment');

// TODO full keepass structure
const initialKeePass = IM.fromJS({
	KeePassFile: {
		Meta: {},
		Root: {}
	}
}, KeePassReviver);

function createGroup() {
	return IM.fromJS({
		'Notes': '',
		'IsExpanded': 'False',
		'Times': {
			'LastModificationTime': null,
			'CreationTime': null,
			'LastAccessTime': null,
			'ExpiryTime': moment('4000-01-01').format(),
			'Expires': 'False',
			'UsageCount': '0',
			'LocationChanged': null
		},
		'DefaultAutoTypeSequence': '',
		'Name': '(No title)',
		'EnableAutoType': 'null',
		'IconID': '37',
		'EnableSearching': 'null',
		'UUID': null,
		'LastTopVisibleEntry': 'AAAAAAAAAAAAAAAAAAAAAA=='
	}, KeePassReviver)
		.set('UUID', base64.fromByteArray(uuid.v4(null, new Array(16))))
		.mergeIn(['Times'], {
			LastModificationTime: moment().format(),
			CreationTime: moment().format(),
			LastAccessTime: moment().format(),
			LocationChanged: moment().format()
		});
}

function createEntry() {
	return IM.fromJS({
        'ForegroundColor': '',
		'BackgroundColor': '',
        'OverrideURL': '',
        'Times': {
            'LastModificationTime': null,
            'CreationTime': null,
            'LastAccessTime': null,
            'ExpiryTime': moment('4000-01-01').format(),
            'Expires': 'False',
            'UsageCount': '0',
            'LocationChanged': null,
        },
        'AutoType': {
            'Enabled': 'True',
            'DataTransferObfuscation': '0'
        },
        'String': [
            {
                'Key': 'Title',
                'Value': ''
            },
            {
                'Key': 'UserName',
                'Value': ''
            },
            {
                'Key': 'Password',
                'Value': ''
            },
            {
                'Key': 'URL',
                'Value': ''
            },
            {
                'Key': 'Notes',
                'Value': ''
            }
        ],
        'History': '',
        'IconID': '0',
        'Tags': '',
        'UUID': null
    }, KeePassReviver)
		.set('UUID', base64.fromByteArray(uuid.v4(null, new Array(16))))
		.mergeIn(['Times'], {
			LastModificationTime: moment().format(),
			CreationTime: moment().format(),
			LastAccessTime: moment().format(),
			LocationChanged: moment().format()
		});
}

export default function db(state = initialKeePass, action) {
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
				(entries) => entries.push(createEntry())
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
			)
			return state.updateIn(
				getPathForUUID(state, action.uuid).push('Group'),
				List(),
				(groups) => groups.push(createGroup())
			);
		default:
			return state;
	}
}
