import { Formik, Form, Field } from "formik";
import css from "./AuthFormSignIn.module.css";
import Button from "../button/Button";
import { NavLink } from "react-router-dom";
// import * as Yup from "yup";
// import { useId } from "react";


export default function AuthFormSignIn () {

//     const validationSchema = Yup.object().shape({
//     email: Yup.string().email("Some error message").required("Email is required"),
//     password: Yup.string().min(6, "Password must be at least 6 characters long").required("Password is required"),
//   });
  const handleSubmit = (values, actions) => {
    actions.resetForm();
  };
    
    
    return (
      <div className={css.container}>
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
    //   validationSchema={validationSchema}        
      onSubmit={handleSubmit}
            >
            <Form className={css.form}>
            <p className={css.text}>Sign In</p>
            <label className={css.label}>
            Enter your email
            <Field type="email" name="email" className={css.input} placeholder="E-mail" />
            </label>
         <label className={css.label}>
        Enter your password
        <Field type="password" name="password" className={css.input} placeholder="Password" />
        </label>
        <Button className={css.button}>Sign In</Button>
        </Form>
      </Formik>
      <nav className={css.nav}>
        <NavLink to="/signup">Sign Up</NavLink>
        </nav>
    </div>
  );
}

