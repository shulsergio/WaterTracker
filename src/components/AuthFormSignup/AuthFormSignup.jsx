import { Formik, Form, Field } from "formik";
import css from "./AuthFormSignup.module.css";
// import { useDispatch } from "react-redux";
import Button from "../button/Button";
import { NavLink } from "react-router-dom";
// import { logIn } from "../../redux/auth/operations";

export default function AuthFormSignup() {
  //   const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    //   dispatch(logIn(values));
    actions.resetForm();
  };
  return (
    <div className={css.container}>
      <Formik
        initialValues={{ email: "", password: "", repeatPassword: "" }}
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
          <label className={css.label}>
            Enter your password
            <Field
              name="password"
              type="password"
              className={css.input}
              placeholder="Password"
            />
          </label>
          <label className={css.label}>
            Repeat password
            <Field
              name="repeatPassword"
              type="password"
              className={css.input}
              placeholder="Repeat password"
            />
          </label>
          <Button className={css.button}>Sign Up</Button>
        </Form>
      </Formik>
      <nav className={css.nav}>
        <NavLink to="/signin">Sign In</NavLink>
      </nav>
    </div>
  );
}
