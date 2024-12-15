import { Formik, Form, Field, ErrorMessage } from "formik";
import css from "./AuthFormSignIn.module.css";
import Button from "../button/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { logIn } from "../../redux/auth/operations";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";


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


  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  
  const handleSubmit = async (values, actions) => {
    setIsLoading(true);
    dispatch(logIn(values))
      .unwrap()
      .then(() => {
        toast.success("OK! You are logged");
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
          {({ errors, touched }) => (
            <Form className={css.form}>
              <p className={css.text}>Sign In</p>

              <label className={css.label}>
                Enter your email
                <Field type="email" name="email" className={`${css.input} ${touched.email && errors.email ? css.inputError : ""
                  }`} placeholder="E-mail" />
              </label>
              <ErrorMessage
                name="email"
                component="div"
                className={css.errorMessage}
              />
            
              <label className={css.label}>
                Enter your password
                <div className={css.passwordWrapper}>
                  <Field type={showPassword ? "text" : "password"} name="password" className={
                    touched.password && errors.password
                      ? `${css.input} ${css.inputError}`
                      : css.input
                  }
                    placeholder="Password" />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className={css.eyeButton}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      < BiShow className={css.eye} />
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
              <Button type="submit" className={css.signinButton}>Sign In</Button>
            </Form>
          )}
            </Formik>
      <nav className={css.navWrap}>
        <NavLink className={css.nav} to="/signup">
          Sign Up
        </NavLink>

 
      </nav>
    </div>
  );
}

