import { NextSeo } from "next-seo";

import styles from "./pag.module.css";
import { HeaderSection } from "@/components/HeaderSection/HeaderSection";
import { AddBookForm } from "@/components/AddBookForm/AddBookForm";

export default function AddBookPage() {
  return (
    <>
      <NextSeo title={"Аўдыёкнігі | адміністраваньне - новая кніга"} />
      <div className={styles.container}>
        <HeaderSection heading={"Адміністраваньне - новая кніга"} />
        <AddBookForm />
      </div>
    </>
  );
}
