import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
// import styles from "./SharedLayout.module.css";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";
// import BackgroundSVG from "../../components/BackgroundSVG/backgroundSVG.jsx";

const SharedLayout = () => {
  const isLoading = useSelector((state) => state.auth.isLoading);
  return (
    <>
      {isLoading && <Loader />}
      <Header />
      {/*       <div > */}
      {/*         <BackgroundSVG /> */}
      {/* <div className={styles.container}> */}
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
      {/* </div> */}
      {/*       </div> */}
    </>
  );
};
export default SharedLayout;

/* import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import styles from "./SharedLayout.module.css";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";

const SharedLayout = () => {
  const isLoading = useSelector((state) => state.auth.isLoading);
  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.background}>
        <div className={styles.container}>
        <Header />
        
        
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </div>
        </div>
      
    </>
  );
};
export default SharedLayout;
 */
