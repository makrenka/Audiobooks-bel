import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

import { HeaderSection } from "@/components/HeaderSection/HeaderSection";
import { UserAuth } from "@/store/auth/types";

import styles from "./page.module.css";

export default function SettingsPage() {
  const [user, setUser] = useState<UserAuth>();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setUser(jwtDecode(token || ""));
  }, []);

  return (
    <>
      <HeaderSection heading={"Налады"} />
      <div className={styles.profile}>
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <div className={styles.profileImg}>
              <p className={styles.profileText}>{user?.name?.slice(0, 1)}</p>
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
        <button className={styles.logoutBtn}>Выйсьці</button>
      </div>
    </>
  );
}
