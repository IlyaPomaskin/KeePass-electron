import React, { findDOMNode } from 'react';
import { connect } from 'react-redux';
import { saveFile } from '../actions/FileActions';
import { isDev } from '../utils/Enviroment';

class SavePageContainer extends React.Component {
    onSaveFile = () => {
        const fileField = findDOMNode(this.refs.filePath);
        const filePath = fileField.files.item(0) && fileField.files.item(0).path;
        const passwordField = findDOMNode(this.refs.password);
        this.props.saveFile(this.props.keePassDatabase, isDev ? 'qweNew.kdbx' : filePath, this.props.dbJson);
    };

    renderError() {
        if (!this.props.error) {
            return null;
        }

        return <div className="uk-text-danger uk-margin-top">
            <p>Error:</p>

            <p>{this.props.error}</p>
        </div>;
    }

    render() {
        return <div className="uk-flex uk-flex-center uk-flex-middle uk-height-viewport">
            <div className="uk-text-center open-file-container">
                <div className="uk-panel uk-panel-box uk-form">
                    <h3>Save file</h3>

                    <div className="uk-form-row">
                        <input ref="filePath" className="uk-width-1-1 uk-form-large" type="file"/>
                    </div>

                    <div className="uk-form-row">
                        <input ref="password"
                               className="uk-width-1-1 uk-form-large"
                               type="text"
                               defaultValue="qwe"
                               placeholder="Password"/>
                    </div>

                    {this.renderError()}

                    <div className="uk-form-row">
                        <button className="uk-width-1-1 uk-button uk-button-primary uk-button-large"
                                disabled={this.props.isSaving}
                                onClick={this.onSaveFile}>
                            { this.props.isSaving ? 'Saving...' : 'Save' }
                        </button>
                    </div>
                </div>
            </div>
        </div>;
    }
}

export default connect(
    (state) => ({
        error: state.file.get('error'),
        isSaving: state.file.get('isSaving'),
        keePassDatabase: state.file.get('keePassDatabase'),
        dbJson: state.db.toJSON()
    }),
    {saveFile}
)(SavePageContainer);
