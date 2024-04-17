import { NextSeo } from "next-seo";
import { useState } from "react";
import { GetServerSideProps } from "next";
import axios from "axios";

import { HeaderDetail } from "@/components/HeaderDetail/HeaderDetail";
import { DetailCard } from "@/components/DetailCard/DetailCard";
import { DetailCategories } from "@/components/DetailCategories/DetailCategories";
import { DetailControlButtons } from "@/components/DetailControlButtons/DetailControlButtons";
import { DetailSummary } from "@/components/DetailSummary/DetailSummary";
import { DetailReviews } from "@/components/DetailReviews/DetailReviews";
import { MiniPlayer } from "@/components/MiniPlayer/MiniPlayer";
import { BottomBar } from "@/components/BottomBar/BottomBar";
import { Book } from "@/store/books/types";
import { BookModalSettings } from "@/components/BookModalSettings/BookModalSettings";
import useClickOutside from "@/hooks/useClickOutside";

import styles from "./page.module.css";

export default function DetailPage({ serverBook }: { serverBook: Book }) {
  const [book, setBook] = useState(serverBook);
  const { ref, isShow, setIsShow } = useClickOutside(false);

  const openMoal = () => {
    setIsShow(!isShow);
  };

  return (
    <>
      <NextSeo title={"Аўдыёкнігі | " + book.title} />
      <div className={styles.container}>
        <HeaderDetail title={book.title} openMoal={openMoal} />
        <main className={styles.main}>
          <DetailCard book={book} />
          <DetailCategories categories={book?.categories} />
          <DetailControlButtons book={book} />
          <DetailSummary summary={book?.summary} />
          <DetailReviews reviews={book?.reviews} />
        </main>
      </div>
      <MiniPlayer />
      <BottomBar />
      {isShow && <BookModalSettings node={ref} />}
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
