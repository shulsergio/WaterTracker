import { Formik, Form, Field, ErrorMessage } from "formik";
import css from "./AuthFormSignup.module.css";
import { useDispatch } from "react-redux";
import Button from "../button/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { signUp } from "../../redux/auth/operations";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must be at maximum 6 characters")
    .required("Password is required"),
});

export default function AuthFormSignup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values, actions) => {
    if (values.password !== values.repeatPassword) {
      alert("Passwords don't match");

      return;
    }
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
        <Form className={css.form}>
          <p className={css.text}>Sign Up</p>
          <label className={css.label}>
            Enter your email
            <Field
              name="email"
              type="email"
              className={css.input}
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
            <Field
              name="password"
              type="password"
              className={css.input}
              placeholder="Password"
            />
          </label>
          <ErrorMessage
            name="password"
            component="div"
            className={css.errorMessage}
          />
          <label className={css.label}>
            Repeat password
            <Field
              name="repeatPassword"
              type="password"
              className={css.input}
              placeholder="Repeat password"
            />
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
      </Formik>
      <nav className={css.nav}>
        <NavLink to="/signin">Sign In</NavLink>
      </nav>
    </div>
  );
}
