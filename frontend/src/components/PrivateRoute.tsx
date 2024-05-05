import React, { ReactNode } from 'react';
import { Redirect } from 'react-router-dom';

type PrivateRouteProps = {
  redirectPath?: string;
  children: ReactNode;
};

export const PrivateRoute = ({
  redirectPath = '/login',
  children,
}: PrivateRouteProps) => {
  if (!localStorage.getItem('user')) {
    return <Redirect to={redirectPath} push />;
  }
  return <>{children}</>;
};
