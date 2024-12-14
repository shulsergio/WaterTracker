import { Formik, Form, Field, ErrorMessage } from "formik";
import css from "./AuthFormSignIn.module.css";
import Button from "../button/Button";
import { NavLink, useNavigate } from "react-router-dom";
// import { signIn } from "../../redux/auth/operations";
import { logIn } from "../../redux/auth/operations";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export default function AuthFormSignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (values, actions) => {
    setIsLoading(true);
    console.log("LoginForm values: ", values);
    console.log(
      "Current Authorization Header ONE:",
      axios.defaults.headers.common.Authorization
    );

    dispatch(logIn(values))
      .unwrap()
      .then(() => {
        toast.success("OK! You are logged");
        console.log(
          "Current Authorization Header FINISH:",
          axios.defaults.headers.common.Authorization
        );
        navigate("/home");
      })
      .catch(() => {
        toast.error("Error, mistake!");
      })
      .finally(() => {
        setIsLoading(false);
        actions.resetForm();
      });
  };

  return (
    <div className={css.container}>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form}>
          <p className={css.text}>Sign In</p>
          <label className={css.label}>
            Enter your email
            <Field
              type="email"
              name="email"
              className={css.input}
              placeholder="E-mail"
            />
          </label>
          <ErrorMessage
            name="email"
            component="div"
            className={css.messageError}
          />
          <label className={css.label}>
            Enter your password
            <Field
              type="password"
              name="password"
              className={css.input}
              placeholder="Password"
            />
          </label>
          <ErrorMessage
            name="password"
            component="div"
            className={css.messageError}
          />
          <Button type="submit" className={css.button}>
            Sign In
          </Button>
        </Form>
      </Formik>
      <nav className={css.nav}>
        <NavLink to="/signup">Sign Up</NavLink>
      </nav>
    </div>
  );
}
