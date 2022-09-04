import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import store from '@/store';
interface IProps {
    config: any,
    location: any
    
}
export class PermissionAuth extends React.Component<IProps> {
    constructor(IProps:any){
        super(IProps);
      }
    render () {
        const { location, config } = this.props;
        const { pathname } = location;
        const targetRouterConfig = config.find((v:any) => v.path === pathname);
        return <Route path={ pathname } component={ targetRouterConfig.component } />
    }
}