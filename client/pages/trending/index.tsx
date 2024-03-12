import { NextSeo } from "next-seo";

import { useAppSelector } from "@/store/hooks";

import { BottomBar } from "@/components/BottomBar/BottomBar";
import { HeaderSection } from "@/components/HeaderSection/HeaderSection";
import { audiobooks } from "@/constants/audiobooks";

import styles from "../recommended/page.module.css";

export default function TrendingPage() {
  const { bookList } = useAppSelector((state) => state.book);

  return (
    <>
      <NextSeo title={"Аўдыёкнігі - папулярнае"} />
      <div className={styles.container}>
        <HeaderSection heading={"Папулярнае"} />
        <main className={styles.main}>
          {bookList.data
            ?.filter((item) =>
              item.sections.map((i) => i.name).includes("trending")
            )
            .map(({ cover, title, author }) => (
              <div className={styles.card} key={title}>
                <img
                  src={
                    cover ? "http://localhost:5000/" + cover : "no-image.png"
                  }
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
