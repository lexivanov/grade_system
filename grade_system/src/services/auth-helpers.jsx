import React from 'react';
import { Redirect } from 'react-router-dom';
import { Cookie } from './cookie-service';

export const avoidUnauthorized = () => {
    const user = Cookie.getCookie('userId');

    return !user ? <Redirect to={'/lobby'} /> : null;
}

export const inPermissionBase = (user) => (...perms) => {
    if (!user) return false;
    return perms.some(x => user.role === x);
}