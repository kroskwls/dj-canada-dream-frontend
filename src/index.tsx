import { ApolloProvider } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom';
import { client } from './apollo';
import { App } from './App';
import './styles/tailwind.css';

// 해당 import를 사용할 경우 react-router-dom의 Link를 사용하여 페이지를 이동할 때
// URL은 변경되지만 화면이 갱신되지않는 버그가 있었음.

// import ReactDOM from 'react-dom/client';
// const root = ReactDOM.createRoot(
// 	document.getElementById('root') as HTMLElement
// );
// root.render(
// 	<React.StrictMode>
// 		<ApolloProvider client={client}>
// 			<App />
// 		</ApolloProvider>
// 	</React.StrictMode>
// );

ReactDOM.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	</React.StrictMode>,
	document.getElementById('root')
);