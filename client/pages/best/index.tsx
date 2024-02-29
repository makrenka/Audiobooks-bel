import { BottomBar } from "@/components/BottomBar/BottomBar";
import { HeaderSection } from "@/components/HeaderSection/HeaderSection";
import { audiobooks } from "@/constants/audiobooks";

import styles from "../recommended/page.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Аўдыёкнігі - лідары продажу",
};

export default function BestPage() {
  return (
    <>
      <div className={styles.container}>
        <HeaderSection heading={"Лідары продажу"} />
        <main className={styles.main}>
          {audiobooks
            .filter((item) => item.section.includes("best"))
            .map(({ cover, title, author }) => (
              <div className={styles.card} key={title}>
                <img
                  src={cover.url ? cover.url : "no-image.png"}
                  alt="Cover of the book"
                  className={styles.img}
                />
                <h3 className={styles.heading}>{title}</h3>
                <p className={styles.author}>{author}</p>
              </div>
            ))}
        </main>
      </div>
      <BottomBar />
    </>
  );
}
