import React from 'react';
import { Redirect } from 'react-router-dom';
import { Cookie } from './cookie-service';

export const avoidUnauthorized = () => {
    const user = Cookie.getCookie('userId');

    return !user ? <Redirect to={'/lobby'} /> : null;
}