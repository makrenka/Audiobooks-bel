import Link from "next/link";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";

import { useAppDispatch } from "@/store/hooks";
import { setForgotDefault, setToken } from "@/store/auth";

import { AuthForm } from "@/components/AuthForm/AuthForm";

import styles from "./page.module.css";

export default function Login() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const fetchAuthUser = async () => {
    const response = await axios
      .get(`http://localhost:5000/auth/user`, {
        withCredentials: true,
      })
      .catch((err) => {
        console.log(err);
        router.push("/");
      });
    console.log(response);

    if (response && response.data) {
      // dispatch(setIsAuthenticated(true));
      // dispatch(setAuthUser(response.data));
      await dispatch(
        setToken(
          Cookies.set("access_token", response.data.access_token) as string
        )
      );
    }
  };

  const signIn = async () => {
    // let timer: any = null;
    // const newWindow = window.open(
    //   `http://localhost:5000/auth/google/login`,
    //   "_blank",
    //   "width=500,height=600"
    // );

    // if (newWindow) {
    //   timer = setInterval(() => {
    //     if (newWindow.closed) {
    //       console.log("authenticated");
    //       fetchAuthUser();
    //       if (timer) clearInterval(timer);
    //     }
    //   }, 500);
    // }
    await router.push("http://localhost:5000/auth/google/login").then(() => {
      console.log("fetchAuthUser");
      fetchAuthUser();
    });
  };

  return (
    <>
      <NextSeo title={"Аўдыёкнігі | Уваход у акаунт"} />
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <img src="/icons/logo.svg" alt="logo" className={styles.logo} />
          <AuthForm />
          <div className={styles.forgetBox}>
            <Link
              href={"/auth/forget"}
              className={styles.formLink}
              onClick={() => dispatch(setForgotDefault())}
            >
              Забылі пароль?
            </Link>
          </div>
          <h4 className={styles.socialHeading}>Ці ўвайдзіце праз:</h4>
          <div className={styles.socialButtons}>
            <button type="button" className={styles.socialBtn} onClick={signIn}>
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
    </>
  );
}
