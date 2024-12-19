import { lazy, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SharedLayout from "./components/SharedLayout/SharedLayout";
import { RestrictedRoute } from "./components/Routs/RestrictedRoute";
// import Loader from './components/Loader/Loader';
import "./App.css";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { refreshUser } from "./redux/auth/operations.js";
import { selectIsRefreshing } from "./redux/auth/selectors.js";
import { PrivateRoute } from "./components/Routs/PrivateRoute.jsx";

function App() {
  const dispatch = useDispatch();

  const isRefreshing = useSelector(selectIsRefreshing);

  const MainPage = lazy(() => import("./pages/MainPage/MainPage"));
  const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
  const WelcomePage = lazy(() => import("./pages/WelcomePage/WelcomePage"));
  const SigninPage = lazy(() => import("./pages/SigninPage/SigninPage"));
  const SignupPage = lazy(() => import("./pages/SignupPage/SignupPage"));
  const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <b>Updating user info...</b>
  ) : (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route path="main" element={<MainPage />} />
          {/* <Route path="welcome" element={<WelcomePage />} /> */}
          <Route path="signin" element={<SigninPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route
            path="welcome"
            element={
              <RestrictedRoute component={<WelcomePage />} redirectTo="/home" />
            }
          />
          <Route
            path="home"
            element={
              <PrivateRoute component={<HomePage />} redirectTo="/welcome" />
            }
          />
          <Route index element={<Navigate to="/welcome" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
