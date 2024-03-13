import { AuthForm } from "@/components/AuthForm/AuthForm";
import styles from "./page.module.css";

export default function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <img src="/icons/logo.svg" alt="logo" className={styles.logo} />
        <AuthForm />
      </div>
    </div>
  );
}
