"use client";
import Lottie from "lottie-react";

import loader from "./Loader.json";

import styles from "./Loader.module.css";

export const Loader = () => (
  <div className={styles.wrapper} data-test-id="loader">
    <Lottie animationData={loader} loop={true} className={styles.loader} />
  </div>
);
