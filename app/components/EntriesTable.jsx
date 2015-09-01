import React from 'react';
import { getEntryFieldValue } from '../utils/Entry';
import EntryRow from './EntryRow';

export default class EntriesTable extends React.Component {
    renderEmpty() {
        if (this.props.entries.size === 0) {
            return <h3 className="uk-text-center">No entries.
                <button className="uk-button uk-button-primary" onClick={() => this.props.openEntryModal()}>
                    Create new?
                </button>
            </h3>;
        } else {
            return <button className="uk-button uk-button-primary uk-float-right" onClick={() => this.props.openEntryModal()}>
                New entry
            </button>;
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
                    index={index}/>)}
                </tbody>
            </table>
            {this.renderEmpty()}
        </div>;
    }
};
