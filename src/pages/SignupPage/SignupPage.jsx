import AuthFormSignup from "../../components/AuthFormSignup/AuthFormSignup";
import css from "./SignupPage.module.css";

export default function SignupPage() {
  console.log("Rendered SignupPage");
  return (
      <div className={css.layer}>  
        <section className={css.container}>
          <div className={css.wrapper}>
            <div className={css.box}>
              <AuthFormSignup />
            </div>
          </div>
        </section>
      </div>
  );
}
