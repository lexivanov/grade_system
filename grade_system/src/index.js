import React from 'react';
import * as ReactDOM from 'react-dom';
import { App, MainPage, CoursePage, TaskPage, TaskListPage, LoginPage, UserPage } from './components';
import { UsersPage } from './components/pages/users-page';
import { Route, Redirect, BrowserRouter, Switch } from 'react-router-dom';
import { store } from './store/store';

import { Provider } from 'react-redux';

ReactDOM.render((
<Provider store={store}>
    <BrowserRouter>
        <App>
            <Switch>
                <Route path='/course/:id' exact component={CoursePage} />
                <Route path='/main' exact component={MainPage} />
                <Route path='/users' exact component={UsersPage} />
                <Route path='/user/:id' exact component={UserPage} />
                <Route path='/task/:id' exact component={TaskPage} />
                <Route path='/tasks' exact component={TaskListPage} />
                <Route path='/login' exact >
                    <LoginPage isRegister={false}/>
                </Route>
                <Route path='/register' exact >
                    <LoginPage isRegister={true}/>
                </Route>
                <Route path='*' >
                    <Redirect to='/main' />
                </Route>
            </Switch>
        </App>
    </BrowserRouter>
</Provider>), 
document.getElementById('root'));
