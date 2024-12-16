import AuthFormSignIn from "../../components/AuthFormSignIn/AuthFormSignIn";
import css from "./SigninPage.module.css";

export default function SigninPage() {
  console.log("Rendered SigninPage");
  return (
    <>
      <div className={css.container}>
        <div className={css.background}>
            <AuthFormSignIn />
           <div className={css.backgroundImage}> </div>
        </div>
        </div>
    </>
  );
}
