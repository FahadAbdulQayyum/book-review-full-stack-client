import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const PrivateRoute: React.FC = () => {

    const { isAuthenticated } = useContext(AuthContext);

    return isAuthenticated ? <Outlet /> :
        <Navigate to="/all" replace />
        ;
}

export default PrivateRoute;