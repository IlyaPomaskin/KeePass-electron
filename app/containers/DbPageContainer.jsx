import React from 'react';
import EntriesTable from '../components/EntriesTable';
import GroupsTree from '../components/GroupsTree';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectGroup, copyToClipboard, openEntryModal } from '../actions/AppActions';
import { toggleGroupExpand, createEntry, createGroup, removeEntry } from '../actions/DbActions';
import { createNotification } from '../actions/NotificationsActions';
import { groupsSelector, entriesSelector } from '../selectors/DbSelectors';
import { isDev } from '../utils/Enviroment';

class DbPageContainer extends React.Component {
    render() {
        return (
            <div>
                <div className="uk-grid uk-margin-top">
                    <div className="uk-width-3-10 app-group-tree">
                        <GroupsTree {...this.props.groups} {...this.props.groupsActions} />
                    </div>
                    <div className="uk-width-7-10">
                        <EntriesTable {...this.props.entries} {...this.props.entriesActions} />
                    </div>
                </div>
				<pre>
					{ isDev ? JSON.stringify(this.props.db.getIn(['KeePassFile', 'Root', 'Group']), null, 4) : null}
				</pre>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        groups: {
            selectedGroup: state.app.get('selectedGroup'),
            groups: groupsSelector(state.db.getIn(['KeePassFile', 'Root', 'Group']))
        },
        entries: {
            entries: entriesSelector(state.db, state.app.get('selectedGroup'))
        },
        db: state.db
    }),
    (dispatch) => ({
        groupsActions: bindActionCreators({
            selectGroup,
            toggleGroupExpand,
            createGroup
        }, dispatch),
        entriesActions: bindActionCreators({
            openEntryModal,
            createNotification,
            copyToClipboard
        }, dispatch)
    })
)(DbPageContainer)
