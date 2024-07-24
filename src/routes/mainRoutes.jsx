import ProtectedRoutes from '../components/ProtectedRoutes';
import HomeLayout from '../components/layouts/HomeLayout';
import AddRegisteredBinPage from '../pages/AddRegisteredBinPage';
import DashboardPage from '../pages/DashboardPage';
import LoginPage from '../pages/LoginPage';
import PageNotFound from '../pages/PageNotFound';
import RegisteredBinsPage from '../pages/RegisteredBinsPage';
import ReportsPage from '../pages/ReportsPage';
import ViewReportsPage from '../pages/ViewReportsPage';
import UsersPage from '../pages/UsersPage';
import AddUserPage from '../pages/AddUserPage';
import ViewUserPage from '../pages/ViewUserPage';
import SettingsPage from '../pages/SettingsPage';

export const mainRoutes = [
    {
        path: '*',
        element: <PageNotFound />,
    },
    {
        path: '/',
        element: (
            <ProtectedRoutes>
                <LoginPage />
            </ProtectedRoutes>
        ),
    },
    {
        path: '/home',
        element: (
            <ProtectedRoutes>
                <HomeLayout />
            </ProtectedRoutes>
        ),
        children: [
            {
                path: 'dashboard',
                element: (
                    <ProtectedRoutes>
                        <DashboardPage />
                    </ProtectedRoutes>
                ),
            },
            {
                path: 'registered-bins',
                element: (
                    <ProtectedRoutes>
                        <RegisteredBinsPage />
                    </ProtectedRoutes>
                ),
            },
            {
                path: 'registered-bins/add-bin',
                element: (
                    <ProtectedRoutes>
                        <AddRegisteredBinPage />
                    </ProtectedRoutes>
                ),
            },
            {
                path: 'reports',
                element: (
                    <ProtectedRoutes>
                        <ReportsPage />
                    </ProtectedRoutes>
                ),
            },
            {
                path: 'reports/:id',
                element: (
                    <ProtectedRoutes>
                        <ViewReportsPage />
                    </ProtectedRoutes>
                ),
            },
            {
                path: 'users',
                element: (
                    <ProtectedRoutes>
                        <UsersPage />
                    </ProtectedRoutes>
                ),
            },
            {
                path: 'users/add-user',
                element: (
                    <ProtectedRoutes>
                        <AddUserPage />
                    </ProtectedRoutes>
                ),
            },
            {
                path: 'users/:id',
                element: (
                    <ProtectedRoutes>
                        <ViewUserPage />
                    </ProtectedRoutes>
                ),
            },
            {
                path: 'settings',
                element: (
                    <ProtectedRoutes>
                        <SettingsPage />
                    </ProtectedRoutes>
                ),
            },
        ],
    },
];
