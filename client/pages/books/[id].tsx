import { NextSeo } from "next-seo";

import { HeaderDetail } from "@/components/HeaderDetail/HeaderDetail";
import { DetailCard } from "@/components/DetailCard/DetailCard";
import { DetailCategories } from "@/components/DetailCategories/DetailCategories";
import { DetailControlButtons } from "@/components/DetailControlButtons/DetailControlButtons";
import { DetailSummary } from "@/components/DetailSummary/DetailSummary";
import { DetailReviews } from "@/components/DetailReviews/DetailReviews";
import { MiniPlayer } from "@/components/MiniPlayer/MiniPlayer";
import { BottomBar } from "@/components/BottomBar/BottomBar";
import { audiobooks } from "@/constants/audiobooks";

import styles from "./page.module.css";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchBook } from "@/store/books";

// export async function generateMetadata({
//   params: { id },
// }: Props): Promise<Metadata> {
//   const book = audiobooks.filter((item) => item.id === id)[0];

//   return {
//     title: `Аўдыёкнігі - ${book?.title}`,
//   };
// }

export default function DetailPage() {
  const dispatch = useAppDispatch();
  const { book } = useAppSelector((state) => state.book);

  useEffect(() => {
    dispatch(fetchBook());
  }, [dispatch]);

  return (
    <>
      <NextSeo title={"Аўдыёкнігі | " + book.data?.title} />
      <div className={styles.container}>
        <HeaderDetail title={book.data?.title} />
        <main className={styles.main}>
          <DetailCard />
          <DetailCategories category={book?.category} />
          <DetailControlButtons book={book} />
          <DetailSummary summary={book?.summary} />
          <DetailReviews reviews={book?.reviews} />
        </main>
      </div>
      <MiniPlayer />
      <BottomBar />
    </>
  );
}
