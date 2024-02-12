import { Header } from "@/components/Header/Header";
import { sections } from "@/constants/sectionsHome";
import { SectionHome } from "@/components/SectionHome/SectionHome";

import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        {sections.map(({ name, content, url }) => (
          <SectionHome key={name} name={name} content={content} url={url} />
        ))}
      </main>
    </div>
  );
}
