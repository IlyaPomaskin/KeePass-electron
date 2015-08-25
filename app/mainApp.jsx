import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, DefaultRoute, Link } from 'react-router';
import { history } from 'react-router/lib/HashHistory';
import { reduxRouteComponent } from 'redux-react-router';

import '../bower_components/uikit/css/uikit.min.css';
import '../bower_components/uikit/css/uikit.almost-flat.min.css';
import '../bower_components/uikit/css/components/accordion.css';
import '../bower_components/uikit/css/components/nestable.css';
import '../bower_components/uikit/css/components/notify.css';
import '../bower_components/uikit/css/components/placeholder.css';
import '../bower_components/uikit/css/components/slidenav.css';
import '../bower_components/uikit/fonts/fontawesome-webfont.woff';
import '../bower_components/uikit/fonts/fontawesome-webfont.woff2';
import './app.css';

import AppContainer from './containers/AppContainer'
import NewPageContainer from './containers/NewPageContainer'
import OpenPageContainer from './containers/OpenPageContainer'
import SavePageContainer from './containers/SavePageContainer'
import DbPageContainer from './containers/DbPageContainer'
import NotFoundPage from './components/NotFoundPage';

import configureStore from './store';
const store = configureStore();

window.location.hash = "/open";

React.render(
	<Provider store={store}>
		{() => <Router history={history}>
		<Route path="/" component={AppContainer}>
			<Route path="new" component={NewPageContainer} />
			<Route path="open" component={OpenPageContainer} />
			<Route path="save" component={SavePageContainer} />
			<Route path="db" component={DbPageContainer} />
			<Route path="*" component={NotFoundPage} />
		</Route>
	</Router>}
	</Provider>,
	document.getElementById('react-root')
);
