import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import  SharedLayout  from "./components/SharedLayout/SharedLayout";
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
    <SharedLayout>
      <Suspense
        fallback={
          <div>
            <Loader />
          </div>
        }
        <Routes>
          <Route
            element={
            }
          />
        </Routes>
      </Suspense>
    </SharedLayout>
  );
}

export default App;