import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import Login from '../components/login/Login'

const PublicRoute = ({ component: Component, isAuthenticated, to, handleEvent, ...rest }) => (
  <Route
    {...rest}
    render={props => (isAuthenticated ? <Redirect to={to} /> : <Login {...props} {...rest.user} handleEvent={handleEvent} />)}
  />
);

PublicRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  to: PropTypes.string,
  handleEvent: PropTypes.func
};

PublicRoute.defaultProps = {
  to: '/dashboard',
};

export default PublicRoute;
