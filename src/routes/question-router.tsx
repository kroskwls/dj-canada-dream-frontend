import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { AddQuestion } from '../pages/add-question';
import { Questions } from '../pages/questions';

export const QuestionRouter = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path='/add-question'>
					<AddQuestion />
				</Route>
				<Route exact path='/'>
					<Questions />
				</Route>
				<Redirect to='/' />
			</Switch>
		</BrowserRouter>
	);
}