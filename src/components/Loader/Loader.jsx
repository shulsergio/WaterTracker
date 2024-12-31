import { RotatingLines } from "react-loader-spinner";
import css from "./Loader.module.css";
export default function Loader() {
  return (
    <div className={css.loaderOverlay}>
      <RotatingLines
        visible={true}
        height="96"
        width="96"
        // color="var(--secondary-color---5)"
        strokeColor="var(--secondary-color-6)"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}
