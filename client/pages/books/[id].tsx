import { Metadata } from "next";

import { HeaderDetail } from "@/components/HeaderDetail/HeaderDetail";
import { DetailCard } from "@/components/DetailCard/DetailCard";
import { DetailCategories } from "@/components/DetailCategories/DetailCategories";
import { DetailControlButtons } from "@/components/DetailControlButtons/DetailControlButtons";
import { DetailSummary } from "@/components/DetailSummary/DetailSummary";
import { DetailReviews } from "@/components/DetailReviews/DetailReviews";
import { MiniPlayer } from "@/components/MiniPlayer/MiniPlayer";
import { BottomBar } from "@/components/BottomBar/BottomBar";

import styles from "./page.module.css";
import { audiobooks } from "@/constants/audiobooks";

// export async function generateMetadata({
//   params: { id },
// }: Props): Promise<Metadata> {
//   const book = audiobooks.filter((item) => item.id === id)[0];

//   return {
//     title: `Аўдыёкнігі - ${book?.title}`,
//   };
// }

export default function DetailPage() {
  const book = audiobooks[0];

  return (
    <>
      <div className={styles.container}>
        <HeaderDetail title={book?.title} />
        <main className={styles.main}>
          <DetailCard
            cover={book?.cover.url ? book?.cover.url : "no-image.png"}
            title={book?.title}
            author={book?.author}
            reviews={book?.reviews}
          />
          <DetailCategories category={book?.category} />
          <DetailControlButtons />
          <DetailSummary summary={book?.summary} />
          <DetailReviews reviews={book?.reviews} />
        </main>
      </div>
      <MiniPlayer
        cover={book?.cover.url}
        title={book?.title}
        author={book?.author}
      />
      <BottomBar />
    </>
  );
}
