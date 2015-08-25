import { KeePassLoadFile, KeePassSaveFile } from '../utils/KeePass';
import { transitionTo, replaceWith } from 'redux-react-router';
import { Promise } from 'bluebird';
import qweKdbxJson from '../qwe.kdbx.jsx';

export const OPEN_FILE_REQUEST = 'OPEN_FILE_REQUEST';
export const OPEN_FILE_SUCCESS = 'OPEN_FILE_SUCCESS';
export const OPEN_FILE_FAILURE = 'OPEN_FILE_FAILURE';

function openFileRequest(filePath) {
	return {
		type: OPEN_FILE_REQUEST
	}
}

function openFileSuccess(filePath, db) {
	return {
		type: OPEN_FILE_SUCCESS,
		filePath,
		db
	}
}

function openFileFailure(error) {
	return {
		type: OPEN_FILE_FAILURE,
		error
	}
}

export function openFile(filePath, password, keyFilePath) {
	return (dispatch) => {
		if (!filePath) {
			return dispatch(openFileFailure('Can\'t load: Select file'));
		}
		dispatch(openFileRequest());
		return KeePassLoadFile(filePath, password, keyFilePath)
			.then(db => {
				//TODO replace with react-router transitionTo
				window.location.hash = '/db';
				return dispatch(openFileSuccess(filePath, db))
			})
			.catch(err => dispatch(openFileFailure(err.message)));
	}
}

export const SAVE_FILE_REQUEST = 'SAVE_FILE_REQUEST';
export const SAVE_FILE_SUCCESS = 'SAVE_FILE_SUCCESS';
export const SAVE_FILE_FAILURE = 'SAVE_FILE_FAILURE';

function saveFileRequest() {
	return {
		type: SAVE_FILE_REQUEST
	}
}

function saveFileSuccess(filePath) {
	return {
		type: SAVE_FILE_SUCCESS,
		filePath
	}
}

function saveFileFailure(error) {
	return {
		type: SAVE_FILE_FAILURE,
		error
	}
}

export function saveFile(db, filePath, json) {
	return (dispatch) => {
		if (!db) {
			return dispatch(saveFileFailure('DB not opened'));
		}
		if (!filePath) {
			return dispatch(saveFileFailure('Can\'t save: Select file'));
		}
		dispatch(saveFileRequest(filePath));
		return KeePassSaveFile(db, filePath, json)
			.then(() => dispatch(saveFileSuccess(filePath)))
			.catch(err => {
				console.log(err);
				dispatch(saveFileFailure(err.message))
			});
	}
}
