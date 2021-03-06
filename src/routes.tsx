import { Suspense, lazy } from 'react';
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

const CandidateList = Loadable(lazy(() => import('./pages/dashboard/candidates/CandidateList')));
const CandidateCreate = Loadable(lazy(() => import('./pages/dashboard/candidates/CandidateCreate')));
const CandidateEdit = Loadable(lazy(() => import('./pages/dashboard/candidates/CandidateEdit')));
const CandidateDetails = Loadable(lazy(() => import('./pages/dashboard/candidates/CandidateDetails')));

const Jobs = Loadable(lazy(() => import('./pages/dashboard/jobs/Jobs')));
const JobCreate = Loadable(lazy(() => import('./pages/dashboard/jobs/JobCreate')));
const JobDetails = Loadable(lazy(() => import('./pages/dashboard/jobs/JobDetails')));
const JobBoard = Loadable(lazy(() => import('./pages/dashboard/jobs/JobBoard')));

const Interviews = Loadable(lazy(() => import('./pages/dashboard/interviews/Interviews')));

const Process = Loadable(lazy(() => import('./pages/dashboard/process/Process')));
const ProcessCreate = Loadable(lazy(() => import('./pages/dashboard/process/ProcessCreate')));

const UsersList = Loadable(lazy(() => import('./pages/dashboard/users/UsersList')));
const TechnologyList = Loadable(lazy(() => import('./pages/dashboard/technologies/TechnologyList')));
const TagList = Loadable(lazy(() => import('./pages/dashboard/tags/TagList')));

const Account = Loadable(lazy(() => import('./pages/dashboard/account/Account')));

const Login = Loadable(lazy(() => import('./pages/authentication/Login')));
const PasswordRecovery = Loadable(lazy(() => import('./pages/authentication/PasswordRecovery')));
const Register = Loadable(lazy(() => import('./pages/authentication/Register')));

const AuthorizationRequired = Loadable(lazy(() => import('./pages/AuthorizationRequired')));
const NotFound = Loadable(lazy(() => import('./pages/NotFound')));
const ServerError = Loadable(lazy(() => import('./pages/ServerError')));

const routes = [
  {
    path: 'app',
    element: (
      <RoleBasedGuard roles={['ADMIN', 'RECRUITER', 'INTERVIEWER', 'EMPLOYEE', 'CANDIDATE']}>
        <DashboardLayout />
      </RoleBasedGuard>
    ),
    children: [
      {
        path: 'candidates',
        children: [
          {
            // path: '',
            index: true,
            element: (
              <RoleBasedGuard roles={['ADMIN', 'RECRUITER', 'INTERVIEWER']}>
                <CandidateList />
              </RoleBasedGuard>
            ),
          },
          {
            path: 'new',
            element: (
              <RoleBasedGuard roles={['ADMIN', 'RECRUITER', 'INTERVIEWER']}>
                <CandidateCreate />
              </RoleBasedGuard>
            ),
          },
          {
            path: ':candidateId',
            element: (
              <RoleBasedGuard roles={['ADMIN', 'RECRUITER', 'INTERVIEWER']}>
                <CandidateDetails />
              </RoleBasedGuard>
            ),
          },
          {
            path: ':candidateId/edit',
            element: (
              <RoleBasedGuard roles={['ADMIN', 'RECRUITER']}>
                <CandidateEdit />
              </RoleBasedGuard>
            ),
          },
        ],
      },
      {
        path: 'jobs',
        children: [
          {
            index: true,
            element: (
              <RoleBasedGuard roles={['ADMIN', 'RECRUITER', 'INTERVIEWER', 'EMPLOYEE', 'CANDIDATE']}>
                <Jobs />
              </RoleBasedGuard>
            ),
          },
          {
            path: 'new',
            element: (
              <RoleBasedGuard roles={['ADMIN', 'RECRUITER']}>
                <JobCreate />
              </RoleBasedGuard>
            ),
          },
          {
            path: ':jobId',
            element: (
              <RoleBasedGuard roles={['ADMIN', 'RECRUITER', 'INTERVIEWER', 'EMPLOYEE', 'CANDIDATE']}>
                <JobDetails />
              </RoleBasedGuard>
            ),
          },
          {
            path: ':jobId/board',
            element: (
              <RoleBasedGuard roles={['ADMIN', 'RECRUITER', 'INTERVIEWER']}>
                <JobBoard />
              </RoleBasedGuard>
            ),
          },
        ],
      },
      {
        path: 'interviews',
        element: (
          <RoleBasedGuard roles={['ADMIN', 'RECRUITER', 'INTERVIEWER', 'EMPLOYEE', 'CANDIDATE']}>
            <Interviews />
          </RoleBasedGuard>
        ),
        children: [],
      },
      {
        path: 'processes',
        children: [
          {
            index: true,
            element: (
              <RoleBasedGuard roles={['ADMIN', 'RECRUITER']}>
                <Process />
              </RoleBasedGuard>
            ),
          },
          {
            path: 'new',
            element: (
              <RoleBasedGuard roles={['ADMIN', 'RECRUITER']}>
                <ProcessCreate />
              </RoleBasedGuard>
            ),
          },
        ],
      },

      {
        path: 'users',
        element: (
          <RoleBasedGuard roles={['ADMIN']}>
            <UsersList />
          </RoleBasedGuard>
        ),
      },
      {
        path: 'technologies',
        element: (
          <RoleBasedGuard roles={['ADMIN']}>
            <TechnologyList />
          </RoleBasedGuard>
        ),
      },
      {
        path: 'tags',
        element: (
          <RoleBasedGuard roles={['ADMIN']}>
            <TagList />
          </RoleBasedGuard>
        ),
      },
      {
        path: 'account',
        element: <Account />,
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
