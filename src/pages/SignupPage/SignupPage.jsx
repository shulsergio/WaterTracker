import AuthFormSignup from "../../components/AuthFormSignup/AuthFormSignup";
import css from "./SignupPage.module.css";

export default function SignupPage() {
  console.log("Rendered SignupPage");
  return (
    <>
      <div className={css.wrapper}>
        <p className={css.text}>Sign Up</p>
        <div className={css.background}>
          <AuthFormSignup />
        </div>
      </div>
    </>
  );
}
