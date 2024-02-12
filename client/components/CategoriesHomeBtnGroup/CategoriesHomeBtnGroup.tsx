import { categories } from "@/constants/categories";
import styles from "./CategoriesHomeBtnGroup.module.css";

export const CategoriesHomeBtnGroup = () => (
  <div className={styles.buttons}>
    {categories.map(({ name }) => (
      <button type="button" className={styles.btn} key={name}>
        {name}
      </button>
    ))}
  </div>
);
