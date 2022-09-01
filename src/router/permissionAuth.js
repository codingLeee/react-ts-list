import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import store from '@/store';

export class PermissionAuth extends React.Component {
    render () {
        const { location, config } = this.props;
        const { pathname } = location;
        const targetRouterConfig = config.find(v => v.path === pathname);
        return <Route path={ pathname } component={ targetRouterConfig.component } />

        
    }
}