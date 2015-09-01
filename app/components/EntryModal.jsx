import React, { findDOMNode } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { openFieldModal, closeEntryModal, MODAL_TYPE_ENTRY } from '../actions/AppActions';
import { saveEntry, removeEntry } from '../actions/DbActions';
import * as KeePass from '../utils/KeePass.jsx';
import { getEntryTitle, getPathForUUID, getEntryFieldValue, getPathForFieldValue, getFields, defaultFields } from '../utils/Entry';

import InlineEdit from 'react-inline-edit';
import { Map } from 'immutable';
import Modal from './Modal';
import FormRow from './FormRow';
import FieldName from './FieldName';

class EntryModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            entry: this.props.entry,
            editableField: null,
            title: getEntryTitle(this.props.entry)
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            title: getEntryTitle(nextProps.entry)
        });
    }

    UNNAMED_FIELD = "Unnamed field";

    getCustomFieldName(fieldName = this.UNNAMED_FIELD) {
        if (fieldName === "") {
            fieldName = fieldName || this.UNNAMED_FIELD;
        }

        const fields = getFields(this.state.entry)
            .filter(field => defaultFields.indexOf(field) === -1)
            .filter(field => field.indexOf(fieldName) === 0);

        var getFreeFieldName = (iteration = 1) => {
            const nextFieldName = fieldName + (iteration === 1 ? '' : ' #' + iteration);
            return !fields.contains(nextFieldName) ? nextFieldName : getFreeFieldName(iteration + 1);
        };

        return getFreeFieldName();
    }

    onAddCustomField = () => {
        this.setState({
            entry: this.state.entry.update('String', fields => fields.push(Map({
                Key: this.getCustomFieldName(),
                Value: ''
            })))
        });
    };

    onSaveClick = () => {
        const entry = this.state.entry.update(entry => {
            const getPath = (field) => getPathForFieldValue(entry, field);
            const getValue = (field) => findDOMNode(this.refs[field].refs['input']).value;
            return getFields(entry).reduce((acc, item) => {
                return acc.setIn(getPath(item), getValue(item));
            }, entry);
        });

        this.props.saveEntry(entry, this.props.isNew);
    };

    onDeleteClick = () => {
        if (confirm(`Delete ${this.state.title} ?`)) {
            this.props.removeEntry(this.props.entry.get('UUID'));
            this.props.closeEntryModal();
        }
    };

    renderDefaultFields() {
        return defaultFields.map((field, key) => {
            const commonProps = {
                defaultValue: getEntryFieldValue(this.state.entry, field),
                field: field,
                key: key,
                ref: field
            };
            switch (field) {
                case 'UserName':
                    return <FormRow {...commonProps} label="Username"/>;
                case 'Notes':
                    const TextArea = <textarea rows="3"></textarea>;
                    return <FormRow {...commonProps} input={TextArea} />;
                default:
                    return <FormRow {...commonProps} />;
            }
        })
    }

    renderCustomFields() {
        return getFields(this.state.entry)
            .filterNot(field => defaultFields.indexOf(field) > -1)
            .map((field, key) => {
                var onApply = (newValue) => {
                    const path = getPathForFieldValue(this.state.entry, field).pop().push('Key');
                    this.setState({
                        entry: this.state.entry.setIn(path, this.getCustomFieldName(newValue)),
                        editableField: null
                    });
                };

                const FieldNameLabel = <div onDoubleClick={() => this.setState({editableField: key})}>{field}</div>;
                const FieldNameInput = <FieldName saveOnBlur={true} onApply={onApply} defaultValue={field}/>;

                const commonProps = {
                    defaultValue: getEntryFieldValue(this.state.entry, field),
                    field: field,
                    key: key,
                    ref: field
                };
                return <FormRow {...commonProps} label={this.state.editableField === key ? FieldNameInput : FieldNameLabel}/>;
            })
    }

    render() {
        const buttons = [
            <button key="delete"
                    className="uk-button uk-button-danger uk-margin-small-right"
                    onClick={this.onDeleteClick}>
                Delete
            </button>,
            <button key="save"
                    className="uk-button uk-button-primary uk-margin-small-right"
                    onClick={this.onSaveClick}>
                Save
            </button>
        ];

        return <Modal header={this.state.title} footer={buttons} closeModal={this.props.closeEntryModal}>
            <h4>Default fields</h4>
            {this.renderDefaultFields()}

            <hr />

            <h4>Custom fields</h4>
            {this.renderCustomFields()}

            <div className="uk-form-row">
                <button className="uk-button uk-float-right" onClick={this.onAddCustomField}>
                    New field
                </button>
            </div>
        </Modal>;
    }
}

export default connect(
    (state) => {
        const uuid = state.app.getIn(['modals', MODAL_TYPE_ENTRY, 'uuid']);
        const path = getPathForUUID(state.db, uuid);
        return {
            isNew: path === null,
            entry: path === null ? KeePass.createEntry() : state.db.getIn(path)
        };
    },
    {
        openFieldModal,
        closeEntryModal,
        saveEntry,
        removeEntry
    }
)(EntryModal)
