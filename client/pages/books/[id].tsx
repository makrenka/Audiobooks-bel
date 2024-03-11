import { NextSeo } from "next-seo";

import { HeaderDetail } from "@/components/HeaderDetail/HeaderDetail";
import { DetailCard } from "@/components/DetailCard/DetailCard";
import { DetailCategories } from "@/components/DetailCategories/DetailCategories";
import { DetailControlButtons } from "@/components/DetailControlButtons/DetailControlButtons";
import { DetailSummary } from "@/components/DetailSummary/DetailSummary";
import { DetailReviews } from "@/components/DetailReviews/DetailReviews";
import { MiniPlayer } from "@/components/MiniPlayer/MiniPlayer";
import { BottomBar } from "@/components/BottomBar/BottomBar";

import styles from "./page.module.css";
import { useState } from "react";
import { GetServerSideProps } from "next";
import { Book } from "@/store/books/types";
import axios from "axios";

// export async function generateMetadata({
//   params: { id },
// }: Props): Promise<Metadata> {
//   const book = audiobooks.filter((item) => item.id === id)[0];

//   return {
//     title: `Аўдыёкнігі - ${book?.title}`,
//   };
// }

export default function DetailPage({ serverBook }: { serverBook: Book }) {
  const [book, setBook] = useState(serverBook);

  return (
    <>
      <NextSeo title={"Аўдыёкнігі | " + book.title} />
      <div className={styles.container}>
        <HeaderDetail title={book.title} />
        <main className={styles.main}>
          <DetailCard book={book} />
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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const response = await axios.get("http://localhost:5000/books/" + params?.id);

  return {
    props: {
      serverBook: response?.data,
    },
  };
};
