import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

import { Book } from "@/store/books/types";
import { useAppDispatch } from "@/store/hooks";
import { fetchUser } from "@/store/users";

import { HeaderDetail } from "@/components/HeaderDetail/HeaderDetail";
import { DetailCard } from "@/components/DetailCard/DetailCard";
import { DetailCategories } from "@/components/DetailCategories/DetailCategories";
import { DetailControlButtons } from "@/components/DetailControlButtons/DetailControlButtons";
import { DetailSummary } from "@/components/DetailSummary/DetailSummary";
import { DetailReviews } from "@/components/DetailReviews/DetailReviews";
import { MiniPlayer } from "@/components/MiniPlayer/MiniPlayer";
import { BottomBar } from "@/components/BottomBar/BottomBar";

import styles from "./page.module.css";

export type JwtPayload = {
  id: string;
};

export default function DetailPage({ serverBook }: { serverBook: Book }) {
  const [book, setBook] = useState(serverBook);
  const dispatch = useAppDispatch();

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
      <NextSeo title={"Аўдыёкнігі | " + book.title} />
      <div className={styles.container}>
        <HeaderDetail title={book.title} />
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
