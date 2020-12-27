import React, { Component } from "react";
import { Route, Redirect } from 'react-router-dom';
import auth from './auth-helper';

/*
Este component renderiza en este PrivateRoute, solo cargará cuandoel usuario este auténticado, 
donde esta determinado a ser llamado por el isAuthenticated. El usuario sera redirigido al Signin component. 
Cargamos los componentes, en PrivateRoute. Esto asegura que solo los usuarios autenticados podrán ver el perfil. 
*/
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        auth.isAuthenticated() ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{
                pathname: '/signin',
                state: { from: props.location }
            }}/>
        )
    )}/>
)

export default PrivateRoute;
