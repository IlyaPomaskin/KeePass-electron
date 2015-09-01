import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Notifications from '../components/Notifications';
import EntryModal from '../components/EntryModal';
import { MODAL_TYPE_ENTRY, MODAL_TYPE_GROUP } from '../actions/AppActions';
import { closeNotification } from '../actions/NotificationsActions';
import { isDev } from '../utils/Enviroment';

class AppContainer extends React.Component {
    getCurrentModal() {
        switch (this.props.currentModal) {
            case MODAL_TYPE_ENTRY:
                return <EntryModal />;
            default:
                return null;
        }
    }

    render() {
        return (
            <div className="uk-container uk-container-center uk-margin-top uk-margin-large-bottom">
                { isDev ? <div className="uk-badge uk-position-top-right">Dev mode</div> : null }
                <Notifications {...this.props.notifications} {...this.props.notificationsActions} />
                {this.getCurrentModal()}
                {this.props.children}
            </div>
        );
    }
}

export default connect(
    (state) => ({
        notifications: {
            notifications: state.notifications
        },
        currentModal: state.app.get('modalsStack').first()
    }),
    (dispatch) => ({
        notificationsActions: bindActionCreators({
            closeNotification
        }, dispatch)
    })
)(AppContainer)
