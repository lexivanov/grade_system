import React from 'react';
import * as ReactDOM from 'react-dom';
import { App, MainPage, CoursePage } from './components';
import { Route, Redirect, BrowserRouter, Switch, Link } from 'react-router-dom';
import { store } from './store/store';

import { Provider } from 'react-redux';

ReactDOM.render((
<Provider store={store}>
    <BrowserRouter>
        <App>
            <Switch>
                <Route path='/course/:id' exact component={CoursePage} />
                <Route path='/main' exact component={MainPage} />
                <Route path='*' >
                    <Redirect to='/main' />
                </Route>
            </Switch>
            <Link to='/main'>НА ГЛАВНУЮ</Link>
        </App>
    </BrowserRouter>
</Provider>), 
document.getElementById('root'));
