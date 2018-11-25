import React from 'react';
import * as ReactDOM from 'react-dom';
import { App, MainPage } from './components';
import { Route, Redirect, BrowserRouter } from 'react-router-dom';
import { store } from './store/store';

import Switch from 'react-router-dom/Switch';
import { Provider } from 'react-redux';

ReactDOM.render((
<Provider store={store}>
    <BrowserRouter>
        <App>
            <Switch>
                {/* <Route path='/course/:id' exact component={CoursePage} /> */}
                <Route path='/main' exact component={MainPage} />
                <Route path='/' exact  >
                    <Redirect to='/main' />
                </Route>
            </Switch>
        </App>
    </BrowserRouter>
</Provider>), 
document.getElementById('root'));
