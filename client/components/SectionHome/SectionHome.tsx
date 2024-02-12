import Link from "next/link";
import styles from "./SectionHome.module.css";

export const SectionHome = ({
  name,
  content,
  url,
}: {
  name: string;
  content: React.ReactNode;
  url: string;
}) => (
  <section className={styles.sectionHome}>
    <div className={styles.wrapper}>
      <div className={styles.blockString}>
        <h2 className={styles.heading}>{name}</h2>
        <Link href={`/${url}`} className={styles.link}>
          Глядзець больш
        </Link>
      </div>
      {content}
    </div>
  </section>
);
