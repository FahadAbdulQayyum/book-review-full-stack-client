import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const PrivateRoute: React.FC = () => {

    const { isAuthenticated } = useContext(AuthContext);

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;













// // PrivateRoute.tsx
// import React, { useContext } from 'react';
// import { Route, Navigate, RouteProps } from 'react-router-dom';
// import AuthContext from '../../context/auth/authContext';

// // interface PrivateRouteProps extends RouteProps {
// interface PrivateRouteProps {
//     element: React.ReactElement;
// }

// const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, ...rest }) => {
//     const { isAuthenticated, loading } = useContext(AuthContext);

//     if (loading) {
//         // Optionally render a loading spinner or similar
//         return <div>Loading...</div>;
//     }

//     return (
//         <Route
//             {...rest}
//             element={isAuthenticated ? element : <Navigate to="/login" />}
//         />
//     );
// };

// export default PrivateRoute;








// // // PrivateRoute.tsx
// // import React from 'react';
// // import { Navigate, Outlet } from 'react-router-dom';

// // // Define a type for your authentication status
// // interface PrivateRouteProps {
// //     isAuthenticated: boolean;
// // }

// // const PrivateRoute: React.FC<PrivateRouteProps> = ({ isAuthenticated }) => {
// //     return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
// // };

// // export default PrivateRoute;








// // import React, { useContext, ReactNode } from 'react';
// // import { Route, Navigate, useLocation, useRoutes } from 'react-router-dom';
// // import AuthContext from '../../context/auth/authContext';

// // interface PrivateRouteProps {
// //     element: ReactNode;
// //     // path: string;
// // }

// // // const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, path }) => {
// // const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
// //     const { isAuthenticated, loading } = useContext(AuthContext);
// //     const location = useLocation();

// //     if (loading) return <div>Loading...</div>;

// //     const routes = [
// //         {
// //             // path,
// //             element: isAuthenticated ? (
// //                 element
// //             ) : (
// //                 <Navigate to='/login' state={{ from: location }} replace />
// //             )
// //         }
// //     ];

// //     return useRoutes(routes);
// // };

// // export default PrivateRoute;








// // // import React, { useContext, ReactNode } from 'react';
// // // import { Route, Navigate, useLocation, RouteProps } from 'react-router-dom';
// // // import AuthContext from '../../context/auth/authContext';

// // // interface PrivateRouteProps extends RouteProps {
// // //     element: ReactNode;
// // // }

// // // const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, ...rest }) => {
// // //     const { isAuthenticated, loading } = useContext(AuthContext);
// // //     const location = useLocation();

// // //     if (loading) return <div>Loading...</div>;

// // //     return isAuthenticated ? (
// // //         <Route {...rest} element={element} />
// // //     ) : (
// // //         <Navigate to='/login' state={{ from: location }} replace />
// // //     );
// // // };

// // // export default PrivateRoute;






// // // // import { useContext } from 'react'
// // // // import AuthContext from '../../context/auth/authContext'
// // // // // import { Route, Redirect } from 'react-router-dom'
// // // // import { Route, Navigate } from 'react-router-dom'

// // // // const PrivateRoute = ({ component: Component, ...rest }) => {
// // // //     const { isAuthenticated, loading } = useContext(AuthContext)
// // // //     return (
// // // //         <div>
// // // //             <Route
// // // //                 {...rest}
// // // //                 render={props === !isAuthenticated && !loading ? (
// // // //                     <Redirect to='login' />
// // // //                 )}:(
// // // //             <Component {...props} />
// // // //             )
// // // //             />
// // // //         </div>
// // // //     )
// // // // }

// // // // export default PrivateRoute
