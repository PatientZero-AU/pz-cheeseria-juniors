import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import store from './state/store';

const client = new QueryClient();

ReactDOM.render(
	<Provider store={store}>
		<QueryClientProvider client={client}>
			<App />
		</QueryClientProvider>
	</Provider>,
	document.getElementById('root')
);
