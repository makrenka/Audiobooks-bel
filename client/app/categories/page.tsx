import { BottomBar } from "@/components/BottomBar/BottomBar";
import { HeaderSection } from "@/components/HeaderSection/HeaderSection";
import { categories } from "@/constants/categories";

import styles from "./page.module.css";

export default function CategoriesPage() {
  return (
    <>
      <div className={styles.container}>
        <HeaderSection heading={"Катэгорыі"} />
        <div className={styles.buttons}>
          {categories.map(({ name }) => (
            <button type="button" className={styles.btn} key={name}>
              {name}
            </button>
          ))}
        </div>
      </div>
      <BottomBar />
    </>
  );
}
