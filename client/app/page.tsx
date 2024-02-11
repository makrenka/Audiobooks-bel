import { Header } from "@/components/Header";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <h1>Home page</h1>
      </main>
    </>
  );
}
