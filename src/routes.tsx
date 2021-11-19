import { Suspense, lazy } from 'react';
// import type { PartialRouteObject } from 'react-router';
import RoleBasedGuard from './components/RoleBasedGuard';
import GuestGuard from './components/GuestGuard';
import LandingPage from './pages/landingPage/LandingPage';
import LoadingScreen from './components/LoadingScreen';
import MainLayout from './components/MainLayout';
import DashboardLayout from './components/dashboard/DashboardLayout';

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

const Login = Loadable(lazy(() => import('./pages/authentication/Login')));
const PasswordRecovery = Loadable(lazy(() => import('./pages/authentication/PasswordRecovery')));
const Register = Loadable(lazy(() => import('./pages/authentication/Register')));

const Users = Loadable(lazy(() => import('./pages/dashboard/Users')));
const Technologies = Loadable(lazy(() => import('./pages/dashboard/Technologies')));
const Tags = Loadable(lazy(() => import('./pages/dashboard/Tags')));

const AuthorizationRequired = Loadable(lazy(() => import('./pages/AuthorizationRequired')));
const NotFound = Loadable(lazy(() => import('./pages/NotFound')));
const ServerError = Loadable(lazy(() => import('./pages/ServerError')));

const routes = [
  {
    path: 'app',
    element: (
      <RoleBasedGuard roles={['ADMIN', 'RECRUITER', 'INTERVIEWER', 'EMPLOYEE']}>
        <DashboardLayout />
      </RoleBasedGuard>
    ),
    children: [
      {
        path: 'users',
        element: <Users />,
      },
      {
        path: 'technologies',
        element: <Technologies />,
      },
      {
        path: 'tags',
        element: <Tags />,
      },
    ],
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: (
          <GuestGuard>
            <LandingPage />
          </GuestGuard>
        ),
      },
      {
        path: 'login',
        element: (
          <GuestGuard>
            <Login />
          </GuestGuard>
        ),
      },
      {
        path: 'password-recovery',
        element: <PasswordRecovery />,
      },
      {
        path: 'register',
        element: (
          <GuestGuard>
            <Register />
          </GuestGuard>
        ),
      },
      {
        path: '401',
        element: <AuthorizationRequired />,
      },
      {
        path: '404',
        element: <NotFound />,
      },
      {
        path: '500',
        element: <ServerError />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
];

export default routes;
