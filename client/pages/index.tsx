import { useEffect } from "react";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

import { wrapper } from "@/store";
import { fetchBooks } from "@/store/books";
import { useAppDispatch } from "@/store/hooks";
import { fetchUser } from "@/store/users";

import { Header } from "@/components/Header/Header";
import { sections } from "@/constants/sectionsHome";
import { SectionHome } from "@/components/SectionHome/SectionHome";
import { BottomBar } from "@/components/BottomBar/BottomBar";

import styles from "./index.module.css";

export type JwtPayload = {
  id: string;
};

export default function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

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

  return (
    <>
      <NextSeo title="Аўдыёкнігі" description="Audiobooks app" />
      <div className={styles.container}>
        <Header />
        <main className={styles.main}>
          {sections.map(({ name, content, url }) => (
            <SectionHome key={name} name={name} content={content} url={url} />
          ))}
        </main>
      </div>
      <BottomBar />
    </>
  );
}

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (ctx) => {
    return { props: {} };
  });
