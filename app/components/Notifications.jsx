import React from 'react';

export default class Notifications extends React.Component {
    render() {
        return <div className="uk-notify uk-notify-top-center">
            {this.props.notifications.map((item, key) => (
                <div key={key}
                     className="uk-notify-message"
                     onClick={() => this.props.closeNotification(item.get('id'))}>
                    <a className="uk-close"></a>

                    <div>{item.get('message')}</div>
                </div>
            ))}
        </div>;
    }
}
