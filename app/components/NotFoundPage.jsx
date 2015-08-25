import React from 'react';
import { Link } from 'react-router';

export default class NotFoundPage extends React.Component {
    render() {
        return <div className="uk-text-center uk-margin-large-top">
            <h1>404. Page not found.</h1>
            <Link className="uk-button uk-button-primary" to="/open">Open file</Link>
        </div>
    }
}
