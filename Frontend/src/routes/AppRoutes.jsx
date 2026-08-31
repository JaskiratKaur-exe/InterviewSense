import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import ProtectedRoute from './ProtectedRoute';
import PageLoader from '../components/common/PageLoader';

// Lazy Loaded Pages for performance & code-splitting
const Landing = lazy(() => import('../pages/Landing/landing.jsx'));
const Login = lazy(() => import('../pages/Auth/Login.jsx'));
const Register = lazy(() => import('../pages/Auth/Register.jsx'));
const Dashboard = lazy(() => import('../pages/Dashboard/Dashboard.jsx'));
const MockInterview = lazy(() => import('../pages/MockInterview/MockInterview.jsx'));
const Reports = lazy(() => import('../pages/Reports/Reports.jsx'));
const Progress = lazy(() => import('../pages/Progress/Progress.jsx'));
const Profile = lazy(() => import('../pages/Profile/Profile.jsx'));
const Settings = lazy(() => import('../pages/Settings/Settings.jsx'));
const NotFound = lazy(() => import('../pages/NotFound/NotFound.jsx'));

export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public Routes */}
        <Route path={ROUTES.HOME} element={<Landing />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />

        {/* Protected Application Routes */}
        <Route
          path={ROUTES.DASHBOARD}
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.MOCK_INTERVIEW}
          element={
            <ProtectedRoute>
              <MockInterview />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.LIVE_SESSION}
          element={
            <ProtectedRoute>
              <MockInterview />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.REPORTS}
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.PROGRESS}
          element={
            <ProtectedRoute>
              <Progress />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.PROFILE}
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.SETTINGS}
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        {/* 404 Catch-All */}
        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;