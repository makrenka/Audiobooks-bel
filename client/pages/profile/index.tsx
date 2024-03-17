import { HeaderSection } from "@/components/HeaderSection/HeaderSection";
import styles from "./page.module.css";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { UserAuth } from "@/store/auth/types";
import Link from "next/link";

export default function ProfilePage() {
  const [user, setUser] = useState<UserAuth>();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setUser(jwtDecode(token || ""));
  }, []);

  console.log(user);

  return (
    <div className={styles.container}>
      <HeaderSection heading={"Профіль"} />
    </div>
  );
}
