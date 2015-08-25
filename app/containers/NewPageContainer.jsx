import React from 'react';
import { Link } from 'react-router';

export default class NewPageContainer extends React.Component {
  render() {
    return (
      <div>
        <h2>New Page</h2>
        <Link to="start">Start</Link>
      </div>
    );
  }
};
