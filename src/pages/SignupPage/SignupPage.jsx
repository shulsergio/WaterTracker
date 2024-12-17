import AuthFormSignup from "../../components/AuthFormSignup/AuthFormSignup";
import css from "./SignupPage.module.css";

export default function SignupPage() {
  console.log("Rendered SignupPage");
  return (
    <>
      <div className={css.container}>
        <div className={css.wrapper}>
          <AuthFormSignup />
        </div>
      </div>
    </>
  );
}
