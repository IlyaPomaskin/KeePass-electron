import React from 'react';
import { connect } from 'react-redux';
import { getPathForUUID, getEntryFieldValue, getPathForFieldValue } from '../utils/Entry';
import { bindActionCreators } from 'redux';
import Notifications from '../components/Notifications';
import EntryModal from '../components/EntryModal';
import { closeEntryModal } from '../actions/AppActions';
import { saveEntry, removeEntry } from '../actions/DbActions';
import { closeNotification } from '../actions/NotificationsActions';
import { isDev } from '../utils/Enviroment';

class AppContainer extends React.Component {
	render() {
		const devBadge = <div className="uk-badge uk-position-top-right">Dev mode</div>;
		return (
			<div className="uk-container uk-container-center uk-margin-top uk-margin-large-bottom">
				{ isDev ? devBadge : null }
				<Notifications {...this.props.notifications} {...this.props.notificationsActions} />
				<EntryModal {...this.props.entryModal} {...this.props.entryModalActions } />
				{this.props.children}
			</div>
		);
	}
};

export default connect(
	(state) => ({
		notifications: {
			notifications: state.notifications
		},
		entryModal: {
			isEntryModalShown: state.app.get('isEntryModalShown'),
	        entry: state.db.getIn(getPathForUUID(state.db, state.app.get('selectedEntry')))
		}
    }),
	(dispatch) => ({
		notificationsActions: bindActionCreators({
			closeNotification
		}, dispatch),
		entryModalActions: bindActionCreators({
			saveEntry,
			removeEntry,
			closeEntryModal
		}, dispatch)
	})
)(AppContainer)
