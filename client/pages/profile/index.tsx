import { HeaderSection } from "@/components/HeaderSection/HeaderSection";
import styles from "./page.module.css";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { UserAuth } from "@/store/auth/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { JwtPayload } from "../settings";
import { fetchUser } from "@/store/users";

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
      </div>
      <ul>
        <li className={styles.profileItem}>
          <h4>Імя</h4>
          <p>{user?.name}</p>
          <img src="/icons/Edit.svg" alt="Edit icon" />
        </li>
      </ul>
    </>
  );
}
