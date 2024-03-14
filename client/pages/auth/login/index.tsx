import { AuthForm } from "@/components/AuthForm/AuthForm";
import styles from "./page.module.css";
import Link from "next/link";

export default function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <img src="/icons/logo.svg" alt="logo" className={styles.logo} />
        <AuthForm />
        <div className={styles.forgetBox}>
          <Link href={"/auth/forget"} className={styles.formLink}>
            Забылі пароль?
          </Link>
        </div>
        <h4 className={styles.socialHeading}>Ці ўвайдзіце праз:</h4>
        <div className={styles.socialButtons}>
          <button type="button" className={styles.socialBtn}>
            <img
              src="/icons/social-media/logos_google.svg"
              alt="auth with google"
            />
          </button>
          <button type="button" className={styles.socialBtn}>
            <img
              src="/icons/social-media/logos_facebook.svg"
              alt="auth with facebook"
            />
          </button>
          <button type="button" className={styles.socialBtn}>
            <img
              src="/icons/social-media/logos_twitter.svg"
              alt="auth with twitter"
            />
          </button>
        </div>
        <p className={styles.registry}>
          Яшчэ не рэгістраваліся?
          <Link href={"/auth/registry"} className={styles.formLink}>
            Зарэгістравацца
          </Link>
        </p>
      </div>
    </div>
  );
}
