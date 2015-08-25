import React, { findDOMNode } from 'react'

export default class OpenFile extends React.Component {
	renderError() {
		if (this.props.error) {
			return <div className="uk-text-danger uk-margin-top">
				<p>Error:</p>
				<p>{this.props.error}</p>
			</div>
		} else {
			return null;
		}
	}

    onOpenFile = () => {
        const fileField = findDOMNode(this.refs.filePath)
        const passwordField = findDOMNode(this.refs.password);
        //TODO remove in production
        const testPath = '/Users/ilya/Documents/work/electron-react-bp/app/qwe.kdbx';
        const filePath = fileField.files.item(0) && fileField.files.item(0).path || testPath;
        this.props.openFile(filePath, passwordField.value);
    }

    render() {
        return <div className="uk-flex uk-flex-center uk-flex-middle uk-height-viewport">
            <div className="uk-text-center open-file-container">
                <div className="uk-panel uk-panel-box uk-form">
					<h3>Open file</h3>
                    <div className="uk-form-row">
                        <input ref="filePath"
                               className="uk-width-1-1 uk-form-large"
                               type="file"/>
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
                            disabled={this.props.isLoading}
                            onClick={this.onOpenFile}>
                            { this.props.isLoading ? 'Loading...' : 'Open' }
                        </button>
                    </div>
                </div>
            </div>
        </div>;
    }
};
