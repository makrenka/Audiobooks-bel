import { useEffect } from "react";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";

import { HeaderSection } from "@/components/HeaderSection/HeaderSection";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { JwtPayload } from "../settings";
import { fetchUser } from "@/store/users";
import { HomeIndicator } from "@/components/HomeIndicator/HomeIndicator";

import styles from "./page.module.css";

export default function ProfilePage() {
  const user = useAppSelector((state) => state.user.user.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const { id } = jwtDecode(token || "") as JwtPayload;
    dispatch(fetchUser(id));
  }, []);

  return (
    <>
      <div className={styles.container}>
        <HeaderSection heading={"Профіль"} />
      </div>
      <div className={styles.profileImg}>
        <img src="/customer-photo-profile.png" alt="Your photo" />
        <button className={styles.editBtnImg}>
          <img src="/icons/Edit.svg" alt="Edit icon" />
        </button>
      </div>
      <ul>
        <li className={styles.profileItem}>
          <h4>Імя</h4>
          <p className={styles.itemText}>{user?.name}</p>
          <button className={styles.editBtn}>
            <img src="/icons/Edit.svg" alt="Edit icon" />
          </button>
        </li>
        <li className={styles.profileItem}>
          <h4>Email</h4>
          <p className={styles.itemText}>{user?.email}</p>
          <button className={styles.editBtn}>
            <img src="/icons/Edit.svg" alt="Edit icon" />
          </button>
        </li>
        <li className={styles.profileItem}>
          <h4>Пароль</h4>
          <Link href={"/profile"} className={styles.itemLink}>
            Змяніць пароль
          </Link>
        </li>
        <li className={styles.profileItemGenres}>
          <h4>Жанры</h4>
          <div className={styles.categories}>
            {!user?.categories.length ? (
              <p className={styles.itemText}>Жанры не абраныя</p>
            ) : (
              user.categories.map(({ name }) => (
                <div className={styles.category} key={name}>
                  {name}
                </div>
              ))
            )}
          </div>
          <Link href={"/personalization"} className={styles.editBtn}>
            <img src="/icons/Edit.svg" alt="Edit icon" />
          </Link>
        </li>
      </ul>
      <HomeIndicator />
    </>
  );
}
