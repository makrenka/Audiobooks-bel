import styles from "./DetailCategories.module.css";

export const DetailCategories = ({
  categories,
}: {
  categories: {
    name: string;
  }[];
}) => (
  <div className={styles.categories}>
    {categories?.map(({ name }) => (
      <div className={styles.category} key={name}>
        {name}
      </div>
    ))}
  </div>
);
