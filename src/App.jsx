import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout';
import { RestrictedRoute } from './components/RestrictedRoute/RestrictedRoute';
import Loader from './components/Loader/Loader';
import './App.css';

function App() {
  const MainPage = lazy(() => import('./pages/MainPage/MainPage'));
  const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
  const WelcomePage = lazy(() => import('./pages/WelcomePage/WelcomePage'));
  const SigninPage = lazy(() => import('./pages/SigninPage/SigninPage'));
  const SignupPage = lazy(() => import('./pages/SignupPage/SignupPage'));
  const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

  return (
    <Layout>
      <Suspense
        fallback={
          <div>
            <Loader />
          </div>
        }
        >
        <MainPage/>
        <Routes>
          <Route path='/welcome' element={<WelcomePage />} />
          <Route path='/signin' element={<SigninPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route
            path='/home'
            element={
              <RestrictedRoute component={<HomePage />} redirectTo='/welcome' />
            }
          />
          <Route path='/' element={<Navigate to='/welcome' replace />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;