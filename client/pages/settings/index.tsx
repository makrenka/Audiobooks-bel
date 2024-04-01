import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { NextSeo } from "next-seo";

import { HeaderSection } from "@/components/HeaderSection/HeaderSection";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchUser, logoutUser } from "@/store/users";
import { HomeIndicator } from "@/components/HomeIndicator/HomeIndicator";

import styles from "./page.module.css";
import { setAuthenticated } from "@/store/auth";

export type JwtPayload = {
  id: string;
};

export default function SettingsPage() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user.data);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const { id } = jwtDecode(token || "") as JwtPayload;
    dispatch(fetchUser(id));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(logoutUser());
    dispatch(setAuthenticated(false));
    router.push("/");
  };

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
