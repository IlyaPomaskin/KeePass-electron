import React from 'react';
import { getEntryFieldValue } from '../utils/Entry';
import EntryRow from './EntryRow';

export default class EntriesTable extends React.Component {
    renderEmptyTable() {
        if (this.props.entries.size === 0) {
            return <h3 className="uk-text-center">
                No entries. <button className="uk-button uk-button-primary" onClick={this.props.createEntry}>Create new?</button>
            </h3>
        } else {
            return null;
        }
    }

    renderCreateEntryButton() {
        if (this.props.entries.size !== 0) {
            return <button
                className="uk-button uk-button-primary uk-float-right"
                onClick={this.props.createEntry}>
                New entry
                </button>
        } else {
            return null;
        }
    }

    render() {
        return <div>
            <table className="uk-table uk-table-hover uk-table-striped uk-table-condensed app-fixed">
                <thead>
                    <tr>
                        <th className="app-column-id">#</th>
                        <th className="uk-width-1-4">Title</th>
                        <th className="uk-width-1-4">Username</th>
                        <th className="uk-width-1-4">Password</th>
                        <th className="uk-width-1-4">URL</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.entries.map((entry, index) => <EntryRow
                        openEntryModal={this.props.openEntryModal}
                        createNotification={this.props.createNotification}
                        copyToClipboard={this.props.copyToClipboard}
                        key={entry.get('UUID')}
                        entry={entry}
                        index={index} />)}
                </tbody>
            </table>
            {this.renderEmptyTable()}
            {this.renderCreateEntryButton()}
        </div>;
    }
};
