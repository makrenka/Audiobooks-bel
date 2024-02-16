import { HeaderDetail } from "@/components/HeaderDetail/HeaderDetail";
import { audiobooks } from "@/constants/audiobooks";
import { DetailCard } from "@/components/DetailCard/DetailCard";

import styles from "./page.module.css";

type Props = {
  params: {
    id: string;
  };
};

export default function DetailPage({ params: { id } }: Props) {
  const book = audiobooks.filter((item) => item.id === id)[0];

  return (
    <>
      <div className={styles.container}>
        <HeaderDetail title={book?.title} />
        <main className={styles.main}>
          <DetailCard
            cover={book?.cover.url}
            title={book?.title}
            author={book?.author}
            reviews={book?.reviews}
          />
        </main>
      </div>
    </>
  );
}
