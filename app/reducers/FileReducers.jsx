import * as FileActions from '../actions/FileActions';
import { Map } from 'immutable';
import { KeePassSaveFile } from '../utils/KeePass';

var initialFile = Map({
	keePassDatabase: null,
	filePath: null,
	error: null,
	isSaving: false,
	isLoading: false
});

export default function file(state = initialFile, action) {
	const { type, filePath, error, db } = action;

	switch (type) {
		case FileActions.OPEN_FILE_REQUEST:
			return state.merge({
				isLoading: true,
				error: null
			});
		case FileActions.OPEN_FILE_FAILURE:
			return state.merge({
				isLoading: false,
				error
			});
		case FileActions.OPEN_FILE_SUCCESS:
			return state.merge({
				filePath,
				keePassDatabase: db,
				isLoading: false,
				error: null
			});
		case FileActions.SAVE_FILE_REQUEST:
			return state.merge({
				isSaving: true,
				error: null
			});
		case FileActions.SAVE_FILE_FAILURE:
			return state.merge({
				isSaving: false,
				error
			});
		case FileActions.SAVE_FILE_SUCCESS:
			return state.merge({
				filePath,
				isSaving: false,
				error: null
			});
		default:
			return state;
	}
}
