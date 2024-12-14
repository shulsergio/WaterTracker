import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import styles from "./SharedLayout.module.css";

const SharedLayout = () => {
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <Header />
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};
export default SharedLayout;
