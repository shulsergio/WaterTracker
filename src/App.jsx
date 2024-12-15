import { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SharedLayout from "./components/SharedLayout/SharedLayout";
import { RestrictedRoute } from "./components/Routs/RestrictedRoute";
// import Loader from './components/Loader/Loader';
import "./App.css";

function App() {
  const MainPage = lazy(() => import("./pages/MainPage/MainPage"));
  const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
  const WelcomePage = lazy(() => import("./pages/WelcomePage/WelcomePage"));
  const SigninPage = lazy(() => import("./pages/SigninPage/SigninPage"));
  const SignupPage = lazy(() => import("./pages/SignupPage/SignupPage"));
  const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route path="main" element={<MainPage />} />
        <Route path="welcome" element={<WelcomePage />} />
        <Route path="signin" element={<SigninPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route
          path="home"
          element={
            <RestrictedRoute component={<HomePage />} redirectTo="/welcome" />
          }
        />
        <Route index element={<Navigate to="/welcome" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
