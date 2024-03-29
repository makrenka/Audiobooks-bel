import { ChangePasswordForm } from "@/components/ChangePasswordForm/ChangePasswordForm";

import styles from "./page.module.css";

export default function ChangePassword() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <img src="/icons/logo.svg" alt="logo" className={styles.logo} />
        <ChangePasswordForm />
      </div>
    </div>
  );
}
