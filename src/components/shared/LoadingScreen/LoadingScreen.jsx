import React from "react";
import styles from "./LoadingScreen.module.scss";

export const LoadingScreen = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className={styles.loadingScreen}>
      <div className={styles.loadingContent}>
        <img
          src="/assets/img/sun.webp"
          alt="Loading"
          className={styles.loadingLogo}
        />
      </div>
    </div>
  );
};

