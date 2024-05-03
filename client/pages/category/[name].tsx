import { GetServerSideProps } from "next";
import { useState } from "react";

import { useAppSelector } from "@/store/hooks";
import { BottomBar } from "@/components/BottomBar/BottomBar";
import { HeaderSection } from "@/components/HeaderSection/HeaderSection";

import styles from "../recommended/page.module.css";

export default function CategoryPage({ category }: { category: string }) {
  const [categoryName, setCategoryName] = useState(category);
  const { bookList } = useAppSelector((state) => state.book);

  const filteredList = bookList.data?.filter((item) =>
    item.categories.map((i) => i.name).includes(categoryName)
  );

  return (
    <>
      <div className={styles.container}>
        <HeaderSection heading={categoryName} />
        <main className={styles.main}>
          {filteredList?.length ? (
            filteredList.map(({ cover, title, author }) => (
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
            ))
          ) : (
            <p className={styles.message}>Яшчэ няма кніг у гэтай катэгорыі</p>
          )}
        </main>
      </div>
      <BottomBar />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return {
    props: {
      category: params?.name,
    },
  };
};
