import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import NewFile from './pages/NewFile';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Logout from './pages/Logout';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'newFile', element: <NewFile /> },
      ],
    },
    
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
        { path: 'login', element: <LoginPage /> },
        { path: 'register', element: <RegisterPage /> },
        { path: 'logout', element: <Logout /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
   
  ]);

  return routes;
}
