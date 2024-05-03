import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { NextSeo } from "next-seo";
import Cookies from "js-cookie";
import classNames from "classnames";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchUser, logoutUser } from "@/store/users";
import { setAuthenticated } from "@/store/auth";

import { HeaderSection } from "@/components/HeaderSection/HeaderSection";
import { HomeIndicator } from "@/components/HomeIndicator/HomeIndicator";
import { Loader } from "@/components/Loader/Loader";

import styles from "./page.module.css";

export type JwtPayload = {
  id: string;
};

export default function SettingsPage() {
  const dispatch = useAppDispatch();
  const { data: user, isLoading } = useAppSelector((state) => state.user.user);
  const changingPasswordData = useAppSelector(
    (state) => state.user.changePassword.data
  );
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const { id } = jwtDecode(token || "") as JwtPayload;
      dispatch(fetchUser(id));
    }
  }, []);

  useEffect(() => {
    const cookie = Cookies.get("access_token");
    if (cookie) {
      const { id } = jwtDecode(cookie || "") as JwtPayload;
      dispatch(fetchUser(id));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    Cookies.remove("access_token");
    dispatch(logoutUser());
    dispatch(setAuthenticated(false));
    router.push("/");
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <NextSeo title={"Аўдыёкнігі | настройкі"} />
      <HeaderSection heading={"Налады"} />
      <div className={styles.profile}>
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <div className={styles.profileImg}>
              {user?.img ? (
                <img
                  src={"http://localhost:5000/" + user?.img}
                  alt="Your photo"
                />
              ) : (
                <p className={styles.profileText}>{user?.name?.slice(0, 1)}</p>
              )}
            </div>
            <div className={styles.profileName}>
              <h3 className={styles.userName}>{user?.name}</h3>
              <Link href={"/profile"} className={styles.link}>
                Паглядзець профіль
              </Link>
              {user?.roles.map((item) => item.value).includes("ADMIN") && (
                <Link
                  href={"/admin"}
                  className={classNames(styles.link, styles.adminLink)}
                >
                  Адміністраваньне
                </Link>
              )}

              {changingPasswordData && (
                <p className={styles.changingPasswordText}>
                  Пароль пасьпяхова зьменены
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.space}></div>
      <nav>
        <ul>
          <li className={styles.settingsItem}>
            <Link href={"/settings"} className={styles.itemLink}>
              Паведамленьні
            </Link>
          </li>
          <li className={styles.settingsItem}>
            <Link href={"/settings"} className={styles.itemLink}>
              Даныя і сховішча
            </Link>
          </li>
          <li>
            <div className={styles.space}></div>
          </li>
          <li className={styles.settingsItem}>
            <Link href={"/settings"} className={styles.itemLink}>
              Падпіска
            </Link>
          </li>
          <li className={styles.settingsItem}>
            <Link href={"/settings"} className={styles.itemLink}>
              Зьвязаны акаунт
            </Link>
          </li>
          <li>
            <div className={styles.space}></div>
          </li>
          <li className={styles.settingsItem}>
            <Link href={"/settings"} className={styles.itemLink}>
              Пра Адыёкнігі
            </Link>
          </li>
        </ul>
      </nav>
      <div className={styles.container}>
        <button className={styles.logoutBtn} onClick={logout}>
          Выйсьці
        </button>
      </div>
      <HomeIndicator />
    </>
  );
}
