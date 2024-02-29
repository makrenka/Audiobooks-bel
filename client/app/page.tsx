import { GetServerSideProps, Metadata } from "next";

import { wrapper } from "@/store";
import { Header } from "@/components/Header/Header";
import { sections } from "@/constants/sectionsHome";
import { SectionHome } from "@/components/SectionHome/SectionHome";
import { BottomBar } from "@/components/BottomBar/BottomBar";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Аўдыёкнігі",
  description: "Audiobooks app",
};

export default function Home() {
  return (
    <>
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
    console.log(store);
    return { props: {} };
  });
