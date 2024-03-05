import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";

import { wrapper } from "@/store";
import { Header } from "@/components/Header/Header";
import { sections } from "@/constants/sectionsHome";
import { SectionHome } from "@/components/SectionHome/SectionHome";
import { BottomBar } from "@/components/BottomBar/BottomBar";

import styles from "./index.module.css";

// export const metadata: Metadata = {
//   title: "Аўдыёкнігі",
//   description: "Audiobooks app",
// };

export default function Home() {
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
