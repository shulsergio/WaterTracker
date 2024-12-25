import AuthFormSignIn from "../../components/AuthFormSignIn/AuthFormSignIn";
import css from "./SigninPage.module.css";

export default function SigninPage() {
  console.log("Rendered SigninPage");
  return (
      <div className={css.layer}>       
        <section className={css.container}>
          <div className={css.background}>
            <div className={css.box}>
              <AuthFormSignIn />
            </div>
          </div>
        </section>
      </div>
  );
}
