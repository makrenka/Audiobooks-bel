import { categories } from "@/constants/categories";
import styles from "./CategoriesHomeBtnGroup.module.css";
import Link from "next/link";

export const CategoriesHomeBtnGroup = () => (
  <div className={styles.buttons}>
    {categories.map(({ name }) => (
      <Link href={`/category/${name}`} className={styles.btn} key={name}>
        {name}
      </Link>
    ))}
  </div>
);
