import { useEffect, useState } from "react";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useRouter } from "next/router";

import { HeaderSection } from "@/components/HeaderSection/HeaderSection";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { JwtPayload } from "../settings";
import { fetchUser } from "@/store/users";
import { HomeIndicator } from "@/components/HomeIndicator/HomeIndicator";
import { PhotoUploader } from "@/components/PhotoUploader/PhotoUploader";
import { useInput } from "@/hooks/useInput";

import styles from "./page.module.css";

export default function ProfilePage() {
  const [photo, setPhoto] = useState("");
  const [isEditName, setIsEditName] = useState(false);
  const [isEditEmail, setIsEditEmail] = useState(false);

  const user = useAppSelector((state) => state.user.user.data);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const name = useInput("");
  const email = useInput("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const { id } = jwtDecode(token || "") as JwtPayload;
    dispatch(fetchUser(id));
  }, []);

  useEffect(() => {
    if (user) {
      const formData = new FormData();
      formData.append("userId", user._id);
      formData.append("img", photo);
      axios
        .post("http://localhost:5000/users/photo", formData)
        .then((resp) => router.reload())
        .catch((e) => console.log(e));
    }
  }, [photo, user]);

  return (
    <>
      <div className={styles.container}>
        <HeaderSection heading={"Профіль"} />
      </div>
      <PhotoUploader setFile={setPhoto} accept="image/*">
        <div className={styles.profileImg}>
          <img src={"http://localhost:5000/" + user?.img} alt="Your photo" />
          <button className={styles.editBtnImg}>
            <img src="/icons/Edit.svg" alt="Edit icon" />
          </button>
        </div>
      </PhotoUploader>
      <ul>
        <li className={styles.profileItem}>
          <h4>Імя</h4>
          {!isEditName ? (
            <p className={styles.itemText}>{user?.name}</p>
          ) : (
            <input
              type="text"
              placeholder="Увядзіце імя"
              className={styles.inputText}
              {...name}
            />
          )}
          <button
            className={styles.editBtn}
            onClick={() => setIsEditName(!isEditName)}
          >
            <img src="/icons/Edit.svg" alt="Edit icon" />
          </button>
        </li>
        <li className={styles.profileItem}>
          <h4>Email</h4>
          {!isEditEmail ? (
            <p className={styles.itemText}>{user?.email}</p>
          ) : (
            <input
              type="text"
              placeholder="Увядзіце email"
              className={styles.inputText}
              {...email}
            />
          )}
          <button
            className={styles.editBtn}
            onClick={() => setIsEditEmail(!isEditEmail)}
          >
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
