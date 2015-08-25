import React, { cloneElement, findDOMNode } from 'react';
import { getPathForUUID, getEntryFieldValue, getPathForFieldValue, getFields, defaultFields } from '../utils/Entry';
import { Map } from 'immutable';
import merge from 'lodash/object/merge';

export default class EntryModal extends React.Component {
    constructor() {
        super();
        document.addEventListener('keydown', this.onKeyDown);
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            entry: newProps.entry
        })
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.onKeyDown);
    }

    onAddCustomField = () => {
        // TODO check for duplicates and append suffix to fieldName
        // FIXME use fieldName entered by user or make it editable
        const fieldId = getFields(this.state.entry)
            .filterNot(field => defaultFields.indexOf(field) > -1)
            .count();
        const fieldName = `*FIXME* ${fieldId + 1}`;
        if (fieldName) {
            this.setState({
                entry: this.state.entry.update(
                    'String',
                    fields => fields.push(Map({ Key: fieldName, Value: '' }))
                )
            });
        }
    }

    onSaveClick = () => {
        const newEntry = this.state.entry.update((entry) => {
            const getPath = (field) => getPathForFieldValue(entry, field);
            const getValue = (field) => findDOMNode(this.refs[field]).value;
            return getFields(entry).reduce((acc, item) => {
                return acc.setIn(getPath(item), getValue(item));
            }, entry);
        })

        this.props.saveEntry(newEntry);
    }

    onDeleteClick = () => {
        if (confirm(`Delete ${getEntryFieldValue(this.props.entry, 'Title', '*no title*')} ?`)) {
            this.props.removeEntry(this.props.entry.get('UUID'));
            this.props.closeEntryModal();
        }
    }

    onKeyDown = (e) => {
        if (e.which === 27) {
            this.props.closeEntryModal();
        }
    }

    renderInput = (key, field, label = field, input) => {
        var newInput = input || <input type="text" />;
        const newProps = {
            defaultValue: getEntryFieldValue(this.state.entry, field),
            ref: field,
            className: 'uk-form-width-large'
        };
        newInput = cloneElement(newInput, merge({}, newInput.props, newProps));

        return <div key={key} className="uk-form-row">
            <label className="uk-form-label">{label}</label>
            <div className="uk-form-controls">
                {newInput}
            </div>
        </div>
    }

    renderDefaultFields() {
        return defaultFields.map((field, key) => {
            switch (field) {
                case 'UserName':
                    return this.renderInput(key, field, 'Username');
                case 'Notes':
                    return this.renderInput(key, field, field, <textarea rows="3"></textarea>);
                default:
                    return this.renderInput(key, field);
            }
        })
    }

    renderCustomFields() {
        return getFields(this.state.entry)
            .filterNot(field => defaultFields.indexOf(field) > -1)
            .map((field, key) => this.renderInput(key, field));
    }

    render() {
        if (!this.props.isEntryModalShown) {
            return null;
        }

        return <div className="uk-modal uk-open" style={{display: 'block', overflowY: 'auto'}}>
			<div className="uk-modal-dialog" onKeyDown={this.onKeyDown}>
                <div className="uk-modal-header">
                    <h3>
                        {getEntryFieldValue(this.props.entry, 'Title', '*no title*')}
                        <a className="uk-modal-close uk-close uk-float-right" onClick={this.props.closeEntryModal}></a>
                    </h3>
                </div>

                <div className="uk-form uk-form-horizontal uk-margin-top">
                    <h4>Default fields</h4>
                    {this.renderDefaultFields()}

                    <hr />

                    <h4>Custom fields</h4>
                    {this.renderCustomFields()}

                    <div className="uk-form-row">
                        <button className="uk-button uk-float-right" onClick={this.onAddCustomField}>New field</button>
                    </div>
                </div>

                <div className="uk-modal-footer uk-text-right">
                    <button className="uk-button uk-button-danger uk-margin-small-right" onClick={this.onDeleteClick}>Delete</button>
                    <button className="uk-button uk-button-primary uk-margin-small-right" onClick={this.onSaveClick}>Save</button>
                    <button className="uk-button" onClick={this.props.closeEntryModal}>Close</button>
                </div>
	        </div>
		</div>
	}
};
