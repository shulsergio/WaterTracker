import AuthFormSignup from "../../components/AuthFormSignup/AuthFormSignup";
import css from "./SignupPage.module.css";

export default function SignupPage() {
  return (
    <>
      <div className={css.container}>
        <div className={css.wrapper}>
          <div className={css.box}>
            <AuthFormSignup />
          </div>
        </div>
      </div>
    </>
  );
}
