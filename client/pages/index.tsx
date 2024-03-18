import { useEffect } from "react";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";

import { wrapper } from "@/store";
import { fetchBooks } from "@/store/books";
import { useAppDispatch } from "@/store/hooks";

import { Header } from "@/components/Header/Header";
import { sections } from "@/constants/sectionsHome";
import { SectionHome } from "@/components/SectionHome/SectionHome";
import { BottomBar } from "@/components/BottomBar/BottomBar";

import styles from "./index.module.css";
import { jwtDecode } from "jwt-decode";

// export const metadata: Metadata = {
//   title: "Аўдыёкнігі",
//   description: "Audiobooks app",
// };

export default function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (jwtDecode(token).exp < Date.now() / 1000) {
      localStorage.removeItem("token");
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
