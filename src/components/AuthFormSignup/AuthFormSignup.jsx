import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import css from "./AuthFormSignup.module.css";
import { useDispatch } from "react-redux";
import Button from "../button/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { signUp } from "../../redux/auth/operations";
import * as Yup from "yup";
import { BiHide, BiShow } from "react-icons/bi";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must be at maximum 64 characters")
    .required("Password is required"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Repeat password is required"),
});

export default function AuthFormSignup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleRepeatPasswordVisibility = () =>
    setShowRepeatPassword((prev) => !prev);

  const handleSubmit = (values, actions) => {
    try {
      dispatch(signUp(values));
      navigate("/signin");
    } catch (error) {
      alert(`Registration failed: ${error.message}`);
    }

    actions.resetForm();
  };

  return (
    <div className={css.container}>
      <Formik
        initialValues={{ email: "", password: "", repeatPassword: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className={css.form}>
            {/* <p className={css.text}>Sign Up</p> */}
            <label className={css.label}>
              Enter your email
              <Field
                name="email"
                type="email"
                className={`${css.input} ${
                  touched.email && errors.email ? css.inputError : ""
                }`}
                placeholder="E-mail"
              />
            </label>
            <ErrorMessage
              name="email"
              component="div"
              className={css.errorMessage}
            />
            <label className={css.label}>
              Enter your password
              <div className={css.passwordWrapper}>
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className={
                    touched.password && errors.password
                      ? `${css.input} ${css.inputError}`
                      : css.input
                  }
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className={css.eyeButton}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <BiShow className={css.eye} />
                  ) : (
                    <BiHide className={css.eye} />
                  )}
                </button>
              </div>
            </label>
            <ErrorMessage
              name="password"
              component="div"
              className={css.errorMessage}
            />
            <label className={css.label}>
              Repeat password
              <div className={css.passwordWrapper}>
                <Field
                  name="repeatPassword"
                  type={showRepeatPassword ? "text" : "password"}
                  className={
                    touched.repeatPassword && errors.repeatPassword
                      ? `${css.input} ${css.inputError}`
                      : css.input
                  }
                  placeholder="Repeat password"
                />
                <button
                  type="button"
                  onClick={toggleRepeatPasswordVisibility}
                  className={css.eyeButton}
                  aria-label="Toggle repeat password visibility"
                >
                  {showRepeatPassword ? (
                    <BiShow className={css.eye} />
                  ) : (
                    <BiHide className={css.eye} />
                  )}
                </button>
              </div>
            </label>
            <ErrorMessage
              name="repeatPassword"
              component="div"
              className={css.errorMessage}
            />
            <Button type="submit" className={css.signupButton}>
              Sign Up
            </Button>
          </Form>
        )}
      </Formik>
      <nav className={css.navWrap}>
        <NavLink className={css.nav} to="/signin">
          Sign In
        </NavLink>
      </nav>
    </div>
  );
}
