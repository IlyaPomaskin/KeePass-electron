import React, { cloneElement, findDOMNode } from 'react';

export default class Modal extends React.Component {
    constructor() {
        super();
        document.addEventListener('keydown', this.onKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.onKeyDown);
    }

    onKeyDown = (e) => {
        if (e.which === 27) {
            this.props.closeModal();
        }
    };

    render() {
        return <div className="uk-modal uk-open" style={{display: 'block', overflowY: 'auto'}}>
            <div className="uk-modal-dialog" onKeyDown={this.onKeyDown}>
                <div className="uk-modal-header">
                    <h3>
                        {this.props.header}
                        <a className="uk-modal-close uk-close uk-float-right" onClick={this.props.closeModal}></a>
                    </h3>
                </div>

                <div className="uk-form uk-form-horizontal uk-margin-top">
                    {this.props.children}
                </div>

                <div className="uk-modal-footer uk-text-right">
                    {this.props.footer}
                    <button className="uk-button" onClick={this.props.closeModal}>Close</button>
                </div>
            </div>
        </div>
    }
};
