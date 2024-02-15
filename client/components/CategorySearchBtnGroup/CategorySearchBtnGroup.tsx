import { searchRecommendedCategories } from "@/constants/searchRecommendedCategories";

import styles from "./CategorySearchBtnGroup.module.css";

export const CategorySearchBtnGroup = () => (
  <section className={styles.categories}>
    <h2 className={styles.heading}>Рэкамэндаваныя катэгорыі</h2>
    <div className={styles.buttons}>
      {searchRecommendedCategories.map(({ icon, name }) => (
        <button className={styles.btn} key={name}>
          <img src={icon} alt="category icon" className={styles.icon} />
          <span>{name}</span>
        </button>
      ))}
    </div>
  </section>
);
