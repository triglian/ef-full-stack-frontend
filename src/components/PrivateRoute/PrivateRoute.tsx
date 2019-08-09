import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { authenticationService } from '../../services/';
import { RouteProps } from 'react-router';

interface IProps extends RouteProps {
  component: any;
}

const PrivateRoute: React.FC<IProps> = ({ component: Component, ...rest }: IProps) => (
  <Route
    {...rest}
    render={(props) => {
      const currentUser = authenticationService.currentUserValue;
      if (!currentUser) {
        // not logged in so redirect to login page with the return url
        return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
      }

      // authorised so return component
      return <Component {...props} />;
    }}
  />
);

export { PrivateRoute };
