import styles from "./DetailCategories.module.css";

export const DetailCategories = ({ category }: { category: string[] }) => (
  <div className={styles.categories}>
    {category?.map((item) => (
      <div className={styles.category} key={item}>
        {item}
      </div>
    ))}
  </div>
);
